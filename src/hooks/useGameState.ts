import { useState, useMemo } from 'react';
import { Player, Board, GameState } from '../types/game';

export const useGameState = (size: number = 9) => {
  const [board, setBoard] = useState<Board>(
    () => Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [lastAction, setLastAction] = useState<string>('Aucune action');
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  // Créer les intersections (81 points sur un plateau 9x9)
  const intersections = useMemo(() => {
    const points = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        points.push({ row, col });
      }
    }
    return points;
  }, [size]);

  const handlePlaceStone = (row: number, col: number) => {
    const logMessage = `🎯 Click sur (${row}, ${col}) - Joueur: ${currentPlayer === 1 ? 'Noir' : 'Blanc'}`;
    setDebugLogs(prev => [...prev.slice(-4), logMessage]);
    
    console.log(`🎯 Click sur intersection (${row}, ${col})`);
    console.log(`📊 État actuel: ${board[row][col] === 0 ? 'Vide' : 'Occupé'}`);
    console.log(`🎮 Joueur actuel: ${currentPlayer === 1 ? 'Noir' : 'Blanc'}`);
    
    if (board[row][col] !== 0) {
      const errorLog = `❌ Intersection (${row}, ${col}) déjà occupée`;
      setDebugLogs(prev => [...prev.slice(-4), errorLog]);
      console.log(`❌ Intersection déjà occupée, placement impossible`);
      return;
    }
    
    const successLog = `✅ Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`;
    setDebugLogs(prev => [...prev.slice(-4), successLog]);
    console.log(`✅ Placement de la pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} en (${row}, ${col})`);
    
    setLastAction(`Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`);
    
    setBoard((prev) => {
      const next = prev.map((r) => r.slice());
      next[row][col] = currentPlayer;
      console.log(`🔄 Nouveau plateau:`, next);
      return next;
    });
    
    setCurrentPlayer((p) => {
      const newPlayer = p === 1 ? 2 : 1;
      const turnLog = `🔄 Tour: ${p === 1 ? 'Noir' : 'Blanc'} → ${newPlayer === 1 ? 'Noir' : 'Blanc'}`;
      setDebugLogs(prev => [...prev.slice(-4), turnLog]);
      console.log(`🔄 Changement de joueur: ${p === 1 ? 'Noir' : 'Blanc'} → ${newPlayer === 1 ? 'Noir' : 'Blanc'}`);
      return newPlayer;
    });
  };

  const gameState: GameState = {
    board,
    currentPlayer,
    lastAction,
    debugLogs,
  };

  return {
    gameState,
    intersections,
    handlePlaceStone,
  };
};
