import { Board, Player } from '../types/game';

// Vérifie si une position est valide sur le plateau
export const isValidPosition = (row: number, col: number, size: number): boolean => {
  return row >= 0 && row < size && col >= 0 && col < size;
};

// Obtient les positions adjacentes d'une intersection
export const getAdjacentPositions = (row: number, col: number, size: number): Array<{row: number, col: number}> => {
  const adjacent = [];
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // haut, bas, gauche, droite
  
  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (isValidPosition(newRow, newCol, size)) {
      adjacent.push({ row: newRow, col: newCol });
    }
  }
  
  return adjacent;
};

// Obtient le groupe de pierres connectées (chaîne) d'une couleur
export const getGroup = (board: Board, row: number, col: number, player: Player): Array<{row: number, col: number}> => {
  if (board[row][col] !== player) return [];
  
  const size = board.length;
  const group: Array<{row: number, col: number}> = [];
  const visited = new Set<string>();
  const queue: Array<{row: number, col: number}> = [{ row, col }];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    const key = `${current.row},${current.col}`;
    
    if (visited.has(key)) continue;
    visited.add(key);
    group.push(current);
    
    // Ajouter les positions adjacentes de la même couleur
    const adjacent = getAdjacentPositions(current.row, current.col, size);
    for (const pos of adjacent) {
      if (board[pos.row][pos.col] === player && !visited.has(`${pos.row},${pos.col}`)) {
        queue.push(pos);
      }
    }
  }
  
  return group;
};

// Vérifie si un groupe a des libertés (positions vides adjacentes)
export const hasLiberties = (board: Board, group: Array<{row: number, col: number}>): boolean => {
  const size = board.length;
  
  for (const { row, col } of group) {
    const adjacent = getAdjacentPositions(row, col, size);
    for (const pos of adjacent) {
      if (board[pos.row][pos.col] === 0) {
        return true; // Au moins une liberté trouvée
      }
    }
  }
  
  return false; // Aucune liberté
};

// Obtient tous les groupes d'un joueur qui n'ont plus de libertés
export const getCapturedGroups = (board: Board, player: Player): Array<Array<{row: number, col: number}>> => {
  const size = board.length;
  const capturedGroups: Array<Array<{row: number, col: number}>> = [];
  const visited = new Set<string>();
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === player) {
        const key = `${row},${col}`;
        if (!visited.has(key)) {
          const group = getGroup(board, row, col, player);
          
          // Marquer toutes les positions du groupe comme visitées
          for (const pos of group) {
            visited.add(`${pos.row},${pos.col}`);
          }
          
          // Vérifier si le groupe n'a plus de libertés
          if (!hasLiberties(board, group)) {
            capturedGroups.push(group);
          }
        }
      }
    }
  }
  
  return capturedGroups;
};

// Vérifie si un placement de pierre est valide (règle du suicide)
export const isValidMove = (board: Board, row: number, col: number, player: Player): boolean => {
  if (board[row][col] !== 0) return false; // Position déjà occupée
  
  const size = board.length;
  
  // Créer un plateau temporaire pour tester le placement
  const tempBoard = board.map(row => row.slice());
  tempBoard[row][col] = player;
  
  // Vérifier si le groupe nouvellement créé a des libertés
  const newGroup = getGroup(tempBoard, row, col, player);
  if (hasLiberties(tempBoard, newGroup)) {
    return true; // Le groupe a des libertés, placement valide
  }
  
  // Si le groupe n'a pas de libertés, vérifier s'il capture des pierres adverses
  const opponent = player === 1 ? 2 : 1;
  const capturedGroups = getCapturedGroups(tempBoard, opponent);
  
  // Le placement est valide s'il capture au moins une pierre adverse
  return capturedGroups.length > 0;
};

// Capture les groupes qui n'ont plus de libertés
export const captureStones = (board: Board): { newBoard: Board, capturedCount: { [key in Player]: number } } => {
  const size = board.length;
  const newBoard = board.map(row => row.slice());
  const capturedCount: { [key in Player]: number } = { 1: 0, 2: 0 };
  
  // Capturer les groupes noirs sans libertés
  const capturedBlackGroups = getCapturedGroups(newBoard, 1);
  for (const group of capturedBlackGroups) {
    for (const { row, col } of group) {
      newBoard[row][col] = 0;
      capturedCount[1]++;
    }
  }
  
  // Capturer les groupes blancs sans libertés
  const capturedWhiteGroups = getCapturedGroups(newBoard, 2);
  for (const group of capturedWhiteGroups) {
    for (const { row, col } of group) {
      newBoard[row][col] = 0;
      capturedCount[2]++;
    }
  }
  
  return { newBoard, capturedCount };
};
