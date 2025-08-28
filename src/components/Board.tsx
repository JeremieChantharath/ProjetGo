import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Grid } from './Grid';
import { Intersection } from './Intersection';
import { Intersection as IntersectionType } from '../types/game';

interface BoardProps {
  size: number;
  intersections: IntersectionType[];
  board: number[][];
  onIntersectionPress: (row: number, col: number) => void;
  showDebug?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  size,
  intersections,
  board,
  onIntersectionPress,
  showDebug = false,
}) => {
  return (
    <View style={[styles.board, { aspectRatio: 1 }]}>
      {/* Couche de la grille */}
      <Grid size={size} />

      {/* Couche des intersections cliquables et des pierres */}
      {intersections.map(({ row, col }) => (
        <Intersection
          key={`${row}-${col}`}
          row={row}
          col={col}
          value={board[row][col]}
          onPress={onIntersectionPress}
          showDebug={showDebug}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#E5C485',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
  },
});
