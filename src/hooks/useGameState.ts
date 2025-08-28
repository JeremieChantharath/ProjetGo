import { useState, useMemo } from 'react';
import { Player, Board, GameState } from '../types/game';
import { isValidMove, captureStones } from '../utils/gameRules';

export const useGameState = (size: number = 9) => {
  const [board, setBoard] = useState<Board>(
    () => Array.from({ length: size }, () => Array.from({ length: size }, () => 0))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>(1);
  const [lastAction, setLastAction] = useState<string>('Aucune action');
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [capturedStones, setCapturedStones] = useState<{ [key in Player]: number }>({ 1: 0, 2: 0 });

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

    // Vérifier si le coup est valide selon les règles du Go
    if (!isValidMove(board, row, col, currentPlayer)) {
      const errorLog = `❌ Coup invalide: suicide non autorisé`;
      setDebugLogs(prev => [...prev.slice(-4), errorLog]);
      console.log(`❌ Coup invalide: suicide non autorisé`);
      return;
    }
    
    const successLog = `✅ Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`;
    setDebugLogs(prev => [...prev.slice(-4), successLog]);
    console.log(`✅ Placement de la pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} en (${row}, ${col})`);
    
    setLastAction(`Pierre ${currentPlayer === 1 ? 'noire' : 'blanche'} placée en (${row}, ${col})`);
    
    setBoard((prev) => {
      const next = prev.map((r) => r.slice());
      next[row][col] = currentPlayer;
      
      // Appliquer la capture des pierres
      const { newBoard, capturedCount } = captureStones(next);
      
      // Mettre à jour le compteur de pierres capturées
      setCapturedStones(prevCaptured => ({
        1: prevCaptured[1] + capturedCount[1],
        2: prevCaptured[2] + capturedCount[2]
      }));
      
      // Afficher les informations de capture
      if (capturedCount[1] > 0 || capturedCount[2] > 0) {
        const captureLog = `🎯 Capture: ${capturedCount[1]} pierre(s) noire(s), ${capturedCount[2]} pierre(s) blanche(s)`;
        setDebugLogs(prev => [...prev.slice(-4), captureLog]);
        setLastAction(`Capture: ${capturedCount[1]} pierre(s) noire(s), ${capturedCount[2]} pierre(s) blanche(s)`);
        console.log(`🎯 Capture effectuée:`, capturedCount);
      }
      
      console.log(`🔄 Nouveau plateau:`, newBoard);
      return newBoard;
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
    capturedStones,
  };

  return {
    gameState,
    intersections,
    handlePlaceStone,
  };
};
