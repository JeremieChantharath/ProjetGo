import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Player } from '../types/game';

interface StoneProps {
  player: Player;
}

export const Stone: React.FC<StoneProps> = ({ player }) => {
  return (
    <View
      style={[
        styles.stone,
        player === 1 ? styles.stoneBlack : styles.stoneWhite,
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
});
