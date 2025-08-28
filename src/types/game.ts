export type Player = 1 | 2; // 1 = Noir, 2 = Blanc

export type Intersection = {
  row: number;
  col: number;
};

export type Board = number[][]; // 0 = vide, 1 = noir, 2 = blanc

export type GameState = {
  board: Board;
  currentPlayer: Player;
  lastAction: string;
  debugLogs: string[];
  capturedStones: { [key in Player]: number };
};

export type RootStackParamList = {
  Login: undefined;
  Game: { playerName: string } | undefined;
};
