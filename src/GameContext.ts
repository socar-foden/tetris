import React from "react";
import _ from "lodash";
import { Block, Block_I, Block_O, Space } from "./blocks/blocks";

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
  spaceList: _.times(25, _.constant(_.times(15, _.constant(Space.empty)))),
};

const GameContext = React.createContext<GameState | null>(null);

export default GameContext;
