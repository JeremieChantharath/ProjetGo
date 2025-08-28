import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GameInfo } from '../components/GameInfo';
import { Board } from '../components/Board';
import { useGameState } from '../hooks/useGameState';

interface GameScreenProps {
  route: any;
}

export const GameScreen: React.FC<GameScreenProps> = ({ route }) => {
  const name = route?.params?.playerName ?? 'Joueur';
  const { gameState, intersections, handlePlaceStone } = useGameState(9);

  return (
    <View style={styles.screenContainer}>
      <GameInfo gameState={gameState} playerName={name} />
      
      <Board
        size={9}
        intersections={intersections}
        board={gameState.board}
        onIntersectionPress={handlePlaceStone}
        showDebug={true}
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
});
