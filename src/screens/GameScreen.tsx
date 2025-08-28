import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GameInfo } from '../components/GameInfo';
import { Board } from '../components/Board';
import { GameRules } from '../components/GameRules';
import { GroupInfo } from '../components/GroupInfo';
import { useGameState } from '../hooks/useGameState';

interface GameScreenProps {
  route: any;
}

export const GameScreen: React.FC<GameScreenProps> = ({ route }) => {
  const name = route?.params?.playerName ?? 'Joueur';
  const { gameState, intersections, handlePlaceStone } = useGameState(9);
  const [showRules, setShowRules] = useState(false);
  const [selectedStone, setSelectedStone] = useState<{row: number, col: number} | null>(null);

  const handleStoneSelection = (stone: {row: number, col: number} | null) => {
    setSelectedStone(stone);
  };

  return (
    <View style={styles.screenContainer}>
      <GameInfo gameState={gameState} playerName={name} />
      
      {/* Bouton pour afficher les règles */}
      <TouchableOpacity 
        style={styles.rulesButton} 
        onPress={() => setShowRules(true)}
      >
        <Text style={styles.rulesButtonText}>📖 Voir les Règles</Text>
      </TouchableOpacity>
      
      <Board
        size={9}
        intersections={intersections}
        board={gameState.board}
        onIntersectionPress={handlePlaceStone}
        showDebug={true}
        onStoneSelection={handleStoneSelection}
      />

      {/* Informations sur le groupe sélectionné */}
      <GroupInfo
        board={gameState.board}
        selectedRow={selectedStone?.row ?? null}
        selectedCol={selectedStone?.col ?? null}
        isVisible={selectedStone !== null}
      />

      {/* Composant des règles */}
      <GameRules 
        isVisible={showRules} 
        onClose={() => setShowRules(false)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 12,
  },
  rulesButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
