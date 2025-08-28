import { 
  isValidPosition, 
  getAdjacentPositions, 
  getGroup, 
  hasLiberties, 
  getCapturedGroups, 
  isValidMove, 
  captureStones 
} from './gameRules';

// Tests pour les fonctions utilitaires
describe('Game Rules Tests', () => {
  const testBoard = [
    [0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0],
    [0, 2, 0, 2, 0],
    [0, 1, 2, 1, 0],
    [0, 0, 0, 0, 0]
  ];

  describe('isValidPosition', () => {
    it('should return true for valid positions', () => {
      expect(isValidPosition(0, 0, 5)).toBe(true);
      expect(isValidPosition(4, 4, 5)).toBe(true);
      expect(isValidPosition(2, 2, 5)).toBe(true);
    });

    it('should return false for invalid positions', () => {
      expect(isValidPosition(-1, 0, 5)).toBe(false);
      expect(isValidPosition(0, -1, 5)).toBe(false);
      expect(isValidPosition(5, 0, 5)).toBe(false);
      expect(isValidPosition(0, 5, 5)).toBe(false);
    });
  });

  describe('getAdjacentPositions', () => {
    it('should return correct adjacent positions for center', () => {
      const adjacent = getAdjacentPositions(2, 2, 5);
      expect(adjacent).toHaveLength(4);
      expect(adjacent).toContainEqual({ row: 1, col: 2 });
      expect(adjacent).toContainEqual({ row: 3, col: 2 });
      expect(adjacent).toContainEqual({ row: 2, col: 1 });
      expect(adjacent).toContainEqual({ row: 2, col: 3 });
    });

    it('should return correct adjacent positions for corner', () => {
      const adjacent = getAdjacentPositions(0, 0, 5);
      expect(adjacent).toHaveLength(2);
      expect(adjacent).toContainEqual({ row: 1, col: 0 });
      expect(adjacent).toContainEqual({ row: 0, col: 1 });
    });
  });

  describe('getGroup', () => {
    it('should return single stone for isolated stone', () => {
      const group = getGroup(testBoard, 1, 1, 1);
      expect(group).toHaveLength(1);
      expect(group).toContainEqual({ row: 1, col: 1 });
    });

    it('should return connected stones for group', () => {
      // Créer un plateau avec un groupe connecté
      const connectedBoard = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const group = getGroup(connectedBoard, 1, 1, 1);
      expect(group).toHaveLength(3);
      expect(group).toContainEqual({ row: 1, col: 1 });
      expect(group).toContainEqual({ row: 1, col: 2 });
      expect(group).toContainEqual({ row: 2, col: 1 });
    });
  });

  describe('hasLiberties', () => {
    it('should return true for stone with liberties', () => {
      const group = getGroup(testBoard, 1, 1, 1);
      expect(hasLiberties(testBoard, group)).toBe(true);
    });

    it('should return false for surrounded stone', () => {
      const surroundedBoard = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 1, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const group = getGroup(surroundedBoard, 2, 2, 1);
      expect(hasLiberties(surroundedBoard, group)).toBe(false);
    });
  });

  describe('captureStones', () => {
    it('should capture surrounded stones', () => {
      const surroundedBoard = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 1, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ];
      
      const { newBoard, capturedCount } = captureStones(surroundedBoard);
      
      // La pierre noire au centre devrait être capturée
      expect(newBoard[2][2]).toBe(0);
      expect(capturedCount[1]).toBe(1);
      expect(capturedCount[2]).toBe(0);
    });
  });

  describe('isValidMove', () => {
    it('should allow valid moves', () => {
      const validBoard = [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];
      
      expect(isValidMove(validBoard, 1, 2, 2)).toBe(true);
    });

    it('should prevent suicide moves', () => {
      const suicideBoard = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 0, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ];
      
      // Placer une pierre noire au centre serait un suicide
      expect(isValidMove(suicideBoard, 2, 2, 1)).toBe(false);
    });

    it('should allow capture moves', () => {
      const captureBoard = [
        [0, 0, 0, 0, 0],
        [0, 2, 2, 2, 0],
        [0, 2, 1, 2, 0],
        [0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0]
      ];
      
      // Placer une pierre blanche au centre capturerait la pierre noire
      expect(isValidMove(captureBoard, 2, 2, 2)).toBe(true);
    });
  });
});
