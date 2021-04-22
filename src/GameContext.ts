import React from "react";
import _ from "lodash";
import { Block, Block_I, Block_O } from "./models/blocks";
import { Space, Space_Empty } from "./models/spaces";

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
}

export const gameState: GameState = {
  nextList: [new Block_I(), new Block_O()],
  score: 0,
  rows: 0,
  level: 1,
  progress: Progress.ready,
  spaceList: _.times(25, () => _.times(15, () => new Space_Empty())),
};

const GameContext = React.createContext<GameState | null>(null);

export default GameContext;
