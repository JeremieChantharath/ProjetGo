import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Board, Player } from '../types/game';
import { getGroup, hasLiberties, getAdjacentPositions } from '../utils/gameRules';

interface LibertyIndicatorProps {
  board: Board;
  selectedRow: number | null;
  selectedCol: number | null;
  size: number;
}

export const LibertyIndicator: React.FC<LibertyIndicatorProps> = ({
  board,
  selectedRow,
  selectedCol,
  size,
}) => {
  if (selectedRow === null || selectedCol === null) return null;
  
  const selectedValue = board[selectedRow][selectedCol];
  if (selectedValue === 0) return null; // Pas de pierre sélectionnée
  
  const selectedPlayer = selectedValue as Player;
  const group = getGroup(board, selectedRow, selectedCol, selectedPlayer);
  const liberties = getAdjacentPositions(selectedRow, selectedCol, size).filter(
    ({ row, col }) => board[row][col] === 0
  );
  
  // Trouver toutes les libertés du groupe
  const groupLiberties = new Set<string>();
  for (const { row, col } of group) {
    const adjacent = getAdjacentPositions(row, col, size);
    for (const pos of adjacent) {
      if (board[pos.row][pos.col] === 0) {
        groupLiberties.add(`${pos.row},${pos.col}`);
      }
    }
  }
  
  const libertyArray = Array.from(groupLiberties).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });

  return (
    <View style={styles.container}>
      {/* Indicateur de libertés */}
      {libertyArray.map(({ row, col }) => (
        <View
          key={`liberty-${row}-${col}`}
          style={[
            styles.libertyDot,
            {
              top: (row / size) * 100 + '%',
              left: (col / size) * 100 + '%',
            },
          ]}
        />
      ))}
      
      {/* Indicateur de sélection */}
      <View
        style={[
          styles.selectionIndicator,
          {
            top: (selectedRow / size) * 100 + '%',
            left: (selectedCol / size) * 100 + '%',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  libertyDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF00',
    borderWidth: 1,
    borderColor: '#00AA00',
    transform: [{ translateX: -4 }, { translateY: -4 }],
    zIndex: 10,
  },
  selectionIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF0000',
    transform: [{ translateX: -6 }, { translateY: -6 }],
    zIndex: 15,
  },
});
