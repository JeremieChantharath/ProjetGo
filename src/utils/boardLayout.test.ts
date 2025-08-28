import { 
  calculateIntersectionPosition, 
  calculateGridLinePosition, 
  calculateIntersectionSpacing,
  GRID_MARGIN_PERCENT,
  GRID_SIZE_PERCENT 
} from './boardLayout';

describe('Board Layout Utils', () => {
  describe('calculateIntersectionSpacing', () => {
    it('should calculate correct spacing for 9x9 board', () => {
      const size = 9;
      const expectedSpacing = GRID_SIZE_PERCENT / (size - 1); // 68 / 8 = 8.5
      
      expect(calculateIntersectionSpacing(size)).toBe(expectedSpacing);
    });
  });

  describe('calculateIntersectionPosition', () => {
    it('should calculate correct positions for 9x9 board', () => {
      const size = 9;
      const spacing = calculateIntersectionSpacing(size);
      
      // Test des positions aux bords
      expect(calculateIntersectionPosition(0, size)).toBe(GRID_MARGIN_PERCENT); // 16%
      expect(calculateIntersectionPosition(8, size)).toBe(GRID_MARGIN_PERCENT + (8 * spacing)); // 84%
      
      // Test des positions centrales
      expect(calculateIntersectionPosition(4, size)).toBe(GRID_MARGIN_PERCENT + (4 * spacing)); // 50%
      
      // Test des positions intermédiaires
      expect(calculateIntersectionPosition(2, size)).toBe(GRID_MARGIN_PERCENT + (2 * spacing)); // 33%
      expect(calculateIntersectionPosition(6, size)).toBe(GRID_MARGIN_PERCENT + (6 * spacing)); // 67%
    });

    it('should return exact values for debugging', () => {
      const size = 9;
      
      // Valeurs exactes pour debug
      console.log('Position 0:', calculateIntersectionPosition(0, size));
      console.log('Position 1:', calculateIntersectionPosition(1, size));
      console.log('Position 4:', calculateIntersectionPosition(4, size));
      console.log('Position 8:', calculateIntersectionPosition(8, size));
      
      expect(calculateIntersectionPosition(0, size)).toBe(16);
      expect(calculateIntersectionPosition(1, size)).toBe(24.5);
      expect(calculateIntersectionPosition(4, size)).toBe(50);
      expect(calculateIntersectionPosition(8, size)).toBe(84);
    });
  });

  describe('calculateGridLinePosition', () => {
    it('should calculate correct grid line positions for 9x9 board', () => {
      const size = 9;
      const spacing = calculateIntersectionSpacing(size);
      
      // Test des lignes aux bords
      expect(calculateGridLinePosition(0, size)).toBe(GRID_MARGIN_PERCENT); // 16%
      expect(calculateGridLinePosition(8, size)).toBe(GRID_MARGIN_PERCENT + (8 * spacing)); // 84%
      
      // Test des lignes centrales
      expect(calculateGridLinePosition(4, size)).toBe(GRID_MARGIN_PERCENT + (4 * spacing)); // 50%
    });
  });

  describe('Constants', () => {
    it('should have correct margin and size values', () => {
      expect(GRID_MARGIN_PERCENT).toBe(16);
      expect(GRID_SIZE_PERCENT).toBe(68); // 100 - (2 * 16)
    });
  });
});
