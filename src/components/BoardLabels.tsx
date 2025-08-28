import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateIntersectionPosition, calculateIntersectionSpacing } from '../utils/boardLayout';

interface BoardLabelsProps {
  size: number;
}

export const BoardLabels: React.FC<BoardLabelsProps> = ({ size }) => {
  // Générer les labels des colonnes (A, B, C, D, E, F, G, H, J pour 9x9)
  const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'];
  
  // Générer les labels des lignes (1, 2, 3, 4, 5, 6, 7, 8, 9)
  const rowLabels = Array.from({ length: size }, (_, i) => (i + 1).toString());

  // Calcul de la taille des intersections basé sur la taille du plateau
  const tileSize = calculateIntersectionSpacing(size);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Labels des colonnes en haut */}
      {columnLabels.map((label, index) => (
        <Text
          key={`col-${index}`}
          style={[
            styles.columnLabel,
            {
              left: `${calculateIntersectionPosition(index, size)}%`,
              transform: [{ translateX: `-${tileSize / 2}%` as any }],
            },
          ]}
        >
          {label}
        </Text>
      ))}

      {/* Labels des lignes à gauche */}
      {rowLabels.map((label, index) => (
        <Text
          key={`row-${index}`}
          style={[
            styles.rowLabel,
            {
              top: `${calculateIntersectionPosition(index, size)}%`,
              transform: [{ translateY: `-${tileSize / 2}%` as any }],
            },
          ]}
        >
          {label}
        </Text>
      ))}
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
    zIndex: 5, // Au-dessus de la grille mais sous les pierres
  },
  columnLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#666', // Gris discret comme demandé
    fontWeight: '500',
    textAlign: 'center',
  },
  rowLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#666', // Gris discret comme demandé
    fontWeight: '500',
    textAlign: 'center',
  },
});
