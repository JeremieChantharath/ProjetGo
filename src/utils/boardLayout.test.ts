import {
  BOARD_PADDING,
  GRID_MARGIN_PERCENT,
  GRID_SIZE_PERCENT,
  calculateIntersectionSpacing,
  calculateIntersectionPosition,
  calculateGridLinePosition
} from './boardLayout';

describe('boardLayout', () => {
  describe('constantes', () => {
    test('BOARD_PADDING doit être 16', () => {
      expect(BOARD_PADDING).toBe(16);
    });

    test('GRID_MARGIN_PERCENT doit être 16', () => {
      expect(GRID_MARGIN_PERCENT).toBe(16);
    });

    test('GRID_SIZE_PERCENT doit être 68 (100 - 2*16)', () => {
      expect(GRID_SIZE_PERCENT).toBe(68);
    });
  });

  describe('calculateIntersectionSpacing', () => {
    test('doit retourner 8.5 pour un plateau 9x9', () => {
      const spacing = calculateIntersectionSpacing(9);
      expect(spacing).toBe(8.5); // 68 / (9-1) = 68 / 8 = 8.5
    });

    test('doit retourner 17 pour un plateau 5x5', () => {
      const spacing = calculateIntersectionSpacing(5);
      expect(spacing).toBe(17); // 68 / (5-1) = 68 / 4 = 17
    });
  });

  describe('calculateIntersectionPosition', () => {
    test('doit retourner 16 pour la première intersection (0,0) sur 9x9', () => {
      const position = calculateIntersectionPosition(0, 9);
      expect(position).toBe(16); // GRID_MARGIN_PERCENT + (0 * 8.5)
    });

    test('doit retourner 50 pour l\'intersection centrale (4,4) sur 9x9', () => {
      const position = calculateIntersectionPosition(4, 9);
      expect(position).toBe(50); // GRID_MARGIN_PERCENT + (4 * 8.5) = 16 + 34 = 50
    });

    test('doit retourner 84 pour la dernière intersection (8,8) sur 9x9', () => {
      const position = calculateIntersectionPosition(8, 9);
      expect(position).toBe(84); // GRID_MARGIN_PERCENT + (8 * 8.5) = 16 + 68 = 84
    });

    test('doit retourner 33 pour l\'intersection (2,2) sur 9x9', () => {
      const position = calculateIntersectionPosition(2, 9);
      expect(position).toBe(33); // GRID_MARGIN_PERCENT + (2 * 8.5) = 16 + 17 = 33
    });
  });

  describe('calculateGridLinePosition', () => {
    test('doit retourner la même valeur que calculateIntersectionPosition', () => {
      for (let i = 0; i < 9; i++) {
        const intersectionPos = calculateIntersectionPosition(i, 9);
        const gridLinePos = calculateGridLinePosition(i, 9);
        expect(gridLinePos).toBe(intersectionPos);
      }
    });
  });

  describe('vérifications des limites', () => {
    test('toutes les positions doivent être dans les limites acceptables', () => {
      const size = 9;
      for (let i = 0; i < size; i++) {
        const position = calculateIntersectionPosition(i, size);
        expect(position).toBeGreaterThanOrEqual(GRID_MARGIN_PERCENT);
        expect(position).toBeLessThanOrEqual(100 - GRID_MARGIN_PERCENT);
      }
    });

    test('l\'espacement doit être cohérent entre toutes les intersections', () => {
      const size = 9;
      const spacing = calculateIntersectionSpacing(size);
      
      for (let i = 1; i < size; i++) {
        const currentPos = calculateIntersectionPosition(i, size);
        const previousPos = calculateIntersectionPosition(i - 1, size);
        const actualSpacing = currentPos - previousPos;
        expect(actualSpacing).toBeCloseTo(spacing, 1);
      }
    });
  });
});
