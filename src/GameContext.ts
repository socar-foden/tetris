import React from "react";
import _ from "lodash";
import { Block } from "./models/blocks";
import { Space } from "./models/spaces";
import { getEmptySpaceListAll } from "./utils";

export const enum Progress {
  ready,
  proceeding,
  end,
}

export interface GameState {
  nextList: Block[];
  score: number;
  rows: number;
  level: number;
  progress: Progress;
  spaceList: Space[][];
  setGameState: (callback: (gameState: GameState) => GameState) => void;
}

export const gameState: GameState = {
  nextList: [],
  score: 0,
  rows: 0,
  level: 1,
  progress: Progress.ready,
  spaceList: getEmptySpaceListAll(),
  setGameState: _.noop,
};

const GameContext = React.createContext<GameState | null>(null);

export default GameContext;
