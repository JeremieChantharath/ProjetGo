import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Board, Player } from '../types/game';
import { getGroup, hasLiberties } from '../utils/gameRules';

interface GroupInfoProps {
  board: Board;
  selectedRow: number | null;
  selectedCol: number | null;
  isVisible: boolean;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({
  board,
  selectedRow,
  selectedCol,
  isVisible,
}) => {
  if (!isVisible || selectedRow === null || selectedCol === null) return null;
  
  const selectedValue = board[selectedRow][selectedCol];
  if (selectedValue === 0) return null;
  
  const selectedPlayer = selectedValue as Player;
  const group = getGroup(board, selectedRow, selectedCol, selectedPlayer);
  const liberties = hasLiberties(board, group);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Groupe Sélectionné</Text>
        <View style={[
          styles.playerIndicator,
          selectedPlayer === 1 ? styles.blackIndicator : styles.whiteIndicator
        ]}>
          <Text style={styles.playerText}>
            {selectedPlayer === 1 ? '●' : '○'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Position:</Text>
        <Text style={styles.infoText}>({selectedRow + 1}, {selectedCol + 1})</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Taille du groupe:</Text>
        <Text style={styles.infoText}>{group.length} pierre(s)</Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Libertés:</Text>
        <Text style={[
          styles.infoText,
          liberties ? styles.libertyYes : styles.libertyNo
        ]}>
          {liberties ? 'Oui' : 'Non'}
        </Text>
      </View>
      
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>État:</Text>
        <Text style={[
          styles.infoText,
          liberties ? styles.statusSafe : styles.statusAtari
        ]}>
          {liberties ? 'En sécurité' : 'En atari (danger)'}
        </Text>
      </View>
      
      {group.length > 1 && (
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Positions du groupe:</Text>
          <View style={styles.groupPositions}>
            {group.slice(0, 6).map(({ row, col }, index) => (
              <Text key={index} style={styles.positionText}>
                ({row + 1}, {col + 1})
              </Text>
            ))}
            {group.length > 6 && (
              <Text style={styles.positionText}>... et {group.length - 6} autres</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  playerIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackIndicator: {
    backgroundColor: '#000',
  },
  whiteIndicator: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerText: {
    fontSize: 16,
    color: '#fff',
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  libertyYes: {
    color: '#28a745',
  },
  libertyNo: {
    color: '#dc3545',
  },
  statusSafe: {
    color: '#28a745',
  },
  statusAtari: {
    color: '#dc3545',
  },
  groupPositions: {
    flex: 1,
    alignItems: 'flex-end',
  },
  positionText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
