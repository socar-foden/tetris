export const enum Space {
  empty,
  block,
  disabled,
}

const enum BlockType {
  I,
  O,
  Z,
  S,
  J,
  L,
  T,
}

export interface Block {
  position: number[][];
  direction: number;
  type: BlockType;
}

export const Block_I: Block = {
  position: [[Space.block], [Space.block], [Space.block], [Space.block]],
  direction: 0,
  type: BlockType.I,
};

export const Block_O: Block = {
  position: [
    [Space.block, Space.block],
    [Space.block, Space.block],
  ],
  direction: 0,
  type: BlockType.O,
};

export const Block_Z: Block = {
  position: [
    [Space.block, Space.block, Space.empty],
    [Space.empty, Space.block, Space.block],
  ],
  direction: 0,
  type: BlockType.Z,
};

export const Block_S: Block = {
  position: [
    [Space.empty, Space.block, Space.block],
    [Space.block, Space.block, Space.empty],
  ],
  direction: 0,
  type: BlockType.S,
};

export const Block_J: Block = {
  position: [
    [Space.empty, Space.block],
    [Space.empty, Space.block],
    [Space.block, Space.block],
  ],
  direction: 0,
  type: BlockType.J,
};

export const Block_L: Block = {
  position: [
    [Space.block, Space.empty],
    [Space.block, Space.empty],
    [Space.block, Space.block],
  ],
  direction: 0,
  type: BlockType.L,
};

export const Block_T: Block = {
  position: [
    [Space.block, Space.block, Space.block],
    [Space.empty, Space.block, Space.empty],
    [Space.empty, Space.block, Space.empty],
  ],
  direction: 0,
  type: BlockType.T,
};
