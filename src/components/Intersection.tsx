import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Stone } from './Stone';
import { Player } from '../types/game';

interface IntersectionProps {
  row: number;
  col: number;
  value: number; // 0 = vide, 1 = noir, 2 = blanc
  onPress: (row: number, col: number) => void;
  showDebug?: boolean;
  isSelected?: boolean;
}

export const Intersection: React.FC<IntersectionProps> = ({
  row,
  col,
  value,
  onPress,
  showDebug = false,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(row, col)}
      style={[
        styles.intersection,
        {
          top: `${(row / 8) * 100}%`,
          left: `${(col / 8) * 100}%`,
        },
      ]}
    >
      {value !== 0 && <Stone player={value as Player} isSelected={isSelected} />}
      {showDebug && (
        <Text style={styles.intersectionDebug}>{row},{col}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  intersection: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    marginTop: -10,
  },
  intersectionDebug: {
    position: 'absolute',
    fontSize: 8,
    color: '#999',
    top: -8,
    left: -8,
  },
});
