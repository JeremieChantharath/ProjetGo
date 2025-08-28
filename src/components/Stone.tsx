import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Player } from '../types/game';

interface StoneProps {
  player: Player;
  isSelected?: boolean;
}

export const Stone: React.FC<StoneProps> = ({ player, isSelected = false }) => {
  return (
    <View
      style={[
        styles.stone,
        player === 1 ? styles.stoneBlack : styles.stoneWhite,
        isSelected && styles.stoneSelected,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  stone: {
    width: '95%',
    aspectRatio: 1,
    borderRadius: 999,
    alignSelf: 'center',
    elevation: 2,
  },
  stoneBlack: {
    backgroundColor: '#111',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  stoneWhite: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  stoneSelected: {
    borderWidth: 3,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
});
