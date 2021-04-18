import React from "react";

export const enum Progress {
  ready,
  proceeding,
  end,
}

export interface GameState {
  score: number;
  rows: number;
  level: number;
  progress: Progress;
}

export const gameState: GameState = {
  score: 0,
  rows: 0,
  level: 1,
  progress: Progress.ready,
};

const GameContext = React.createContext<GameState | null>(null);

export default GameContext;
