import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateIntersectionPosition } from '../utils/boardLayout';

interface BoardDebugProps {
  size: number;
}

export const BoardDebug: React.FC<BoardDebugProps> = ({ size }) => {
  // Calcul des positions exactes pour debug
  const positions = Array.from({ length: size }, (_, i) => ({
    index: i,
    position: calculateIntersectionPosition(i, size)
  }));

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Debug des positions */}
      <Text style={styles.debugTitle}>Debug Positions:</Text>
      {positions.map(({ index, position }) => (
        <Text key={index} style={styles.debugText}>
          Index {index}: {position.toFixed(1)}%
        </Text>
      ))}
      
      {/* Debug des coordonnées */}
      <Text style={styles.debugTitle}>Coordonnées:</Text>
      <Text style={styles.debugText}>A: {calculateIntersectionPosition(0, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>B: {calculateIntersectionPosition(1, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>C: {calculateIntersectionPosition(2, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>D: {calculateIntersectionPosition(3, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>E: {calculateIntersectionPosition(4, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>F: {calculateIntersectionPosition(5, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>G: {calculateIntersectionPosition(6, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>H: {calculateIntersectionPosition(7, size).toFixed(1)}%</Text>
      <Text style={styles.debugText}>J: {calculateIntersectionPosition(8, size).toFixed(1)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  debugTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
});
