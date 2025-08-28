import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GridProps {
  size: number;
}

export const Grid: React.FC<GridProps> = ({ size }) => {
  return (
    <View pointerEvents="none" style={styles.gridLayer}>
      {/* Lignes horizontales */}
      {Array.from({ length: size }, (_, i) => (
        <View
          key={`h-${i}`}
          style={[
            styles.gridLineHorizontal,
            { top: `${(i / (size - 1)) * 100}%` },
          ]}
        />
      ))}
      
      {/* Lignes verticales */}
      {Array.from({ length: size }, (_, i) => (
        <View
          key={`v-${i}`}
          style={[
            styles.gridLineVertical,
            { left: `${(i / (size - 1)) * 100}%` },
          ]}
        />
      ))}
      
      {/* Points étoiles (hoshi) pour 9x9: (2,2) (2,6) (6,2) (6,6) (4,4) */}
      {[{ r: 2, c: 2 }, { r: 2, c: 6 }, { r: 6, c: 2 }, { r: 6, c: 6 }, { r: 4, c: 4 }].map(({ r, c }, idx) => (
        <View
          key={`s-${idx}`}
          style={[
            styles.starPoint,
            { top: `${(r / (size - 1)) * 100}%`, left: `${(c / (size - 1)) * 100}%` },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1.5,
    backgroundColor: '#7C5A24',
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: '#7C5A24',
  },
  starPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: 3,
    backgroundColor: '#5a3a0a',
    opacity: 0.8,
  },
});
