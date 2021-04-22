import {
  Block,
  Block_I,
  Block_J,
  Block_L,
  Block_O,
  Block_S,
  Block_T,
  Block_Z,
} from "../models/blocks";

export const getRandomBlock = (): Block => {
  const blockClassList: Block[] = [
    new Block_I(),
    new Block_O(),
    new Block_Z(),
    new Block_S(),
    new Block_J(),
    new Block_L(),
    new Block_T(),
  ];
  const i: number = Math.floor(Math.random() * 7);

  return blockClassList[i];
};
