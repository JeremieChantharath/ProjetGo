import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Stone } from './Stone';
import { Player } from '../types/game';
import { calculateIntersectionPosition } from '../utils/boardLayout';

interface IntersectionProps {
  row: number;
  col: number;
  value: number; // 0 = vide, 1 = noir, 2 = blanc
  onPress: (row: number, col: number) => void;
  showDebug?: boolean;
  isSelected?: boolean;
  size: number; // Ajout de la taille du plateau
}

export const Intersection: React.FC<IntersectionProps> = ({
  row,
  col,
  value,
  onPress,
  showDebug = false,
  isSelected = false,
  size,
}) => {
  // Calcul de la taille des intersections basé sur la taille du plateau
  const tilePercent = 100 / (size - 1);
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(row, col)}
      style={[
        styles.intersection,
        {
          top: `${(row / (size - 1)) * 100}%`,
          left: `${(col / (size - 1)) * 100}%`,
          width: `${tilePercent}%`,
          height: `${tilePercent}%`,
          marginLeft: -(tilePercent / 2),
          marginTop: -(tilePercent / 2),
        },
      ]}
    >
      {value !== 0 && <Stone player={value as Player} isSelected={isSelected} />}
      {/* Suppression de l'affichage des coordonnées de debug */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  intersection: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intersectionDebug: {
    position: 'absolute',
    fontSize: 9,
    color: '#999999', // Gris clair comme demandé
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond semi-transparent
    paddingHorizontal: 2,
    paddingVertical: 1,
    borderRadius: 3,
    top: -10, // Légèrement décalé pour éviter le chevauchement
    left: -8,
    zIndex: 10, // Au-dessus des pierres
  },
});
