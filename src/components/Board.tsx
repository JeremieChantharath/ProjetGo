import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Grid } from './Grid';
import { Intersection } from './Intersection';
import { LibertyIndicator } from './LibertyIndicator';
import { BoardLabels } from './BoardLabels';
import { BoardDebug } from './BoardDebug';
import { Intersection as IntersectionType } from '../types/game';
import { BOARD_PADDING } from '../utils/boardLayout';

interface BoardProps {
  size: number;
  intersections: IntersectionType[];
  board: number[][];
  onIntersectionPress: (row: number, col: number) => void;
  onStoneSelection: (stone: {row: number, col: number} | null) => void;
  showDebug?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  size,
  intersections,
  board,
  onIntersectionPress,
  onStoneSelection,
  showDebug = false, // Désactivé par défaut
}) => {
  const [selectedStone, setSelectedStone] = useState<{row: number, col: number} | null>(null);

  const handleIntersectionPress = (row: number, col: number) => {
    // Si on clique sur une pierre existante, la sélectionner
    if (board[row][col] !== 0) {
      const newSelection = selectedStone?.row === row && selectedStone?.col === col ? null : { row, col };
      setSelectedStone(newSelection);
      onStoneSelection(newSelection);
      return;
    }
    
    // Sinon, placer une pierre
    onIntersectionPress(row, col);
    setSelectedStone(null); // Désélectionner après placement
    onStoneSelection(null);
  };

  return (
    <View style={[styles.board, { aspectRatio: 1 }]}>
      {/* Composant de debug temporaire */}
      <BoardDebug size={size} />

      {/* Couche des coordonnées discrètes */}
      <BoardLabels size={size} />

      {/* Couche de la grille */}
      <Grid size={size} />

      {/* Couche des intersections cliquables et des pierres */}
      {intersections.map(({ row, col }) => (
        <Intersection
          key={`${row}-${col}`}
          row={row}
          col={col}
          value={board[row][col]}
          onPress={handleIntersectionPress}
          showDebug={showDebug}
          isSelected={selectedStone?.row === row && selectedStone?.col === col}
          size={size}
        />
      ))}

      {/* Indicateur de libertés pour la pierre sélectionnée */}
      <LibertyIndicator
        board={board}
        selectedRow={selectedStone?.row ?? null}
        selectedCol={selectedStone?.col ?? null}
        size={size}
      />
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
    padding: 24, // Padding augmenté pour faire de la place aux repères de coordonnées
    position: 'relative',
  },
});
