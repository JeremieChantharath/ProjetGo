import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState, Player } from '../types/game';

interface GameInfoProps {
  gameState: GameState;
  playerName: string;
}

export const GameInfo: React.FC<GameInfoProps> = ({ gameState, playerName }) => {
  const { board, currentPlayer, lastAction, debugLogs } = gameState;

  return (
    <>
      <Text style={styles.title}>Plateau 9x9</Text>
      <Text style={styles.subtitle}>Bon jeu, {playerName} !</Text>
      <Text style={styles.turnText}>Tour: {currentPlayer === 1 ? 'Noir' : 'Blanc'}</Text>
      
      {/* Debug info */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Debug: Cliquez sur une intersection</Text>
        <Text style={styles.debugText}>Pierres placées: {board.flat().filter(cell => cell !== 0).length}</Text>
        <Text style={styles.debugText}>Dernière action: {lastAction}</Text>
        
        {/* Logs visuels */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>Logs en temps réel:</Text>
          {debugLogs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  turnText: {
    textAlign: 'center',
    marginBottom: 8,
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  logsContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e8f4fd',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  logsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  logText: {
    fontSize: 11,
    color: '#333',
    marginBottom: 2,
  },
});
