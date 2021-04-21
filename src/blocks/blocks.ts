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

export class Block {
  protected _position: number[][];
  protected _direction: number;
  _type: BlockType;

  get position() {
    return this._position;
  }
  get direction() {
    return this._direction;
  }
}

export class Block_I extends Block {
  _position: [[Space.block], [Space.block], [Space.block], [Space.block]];
  _direction: 0;
  _type: BlockType.I;
}

export class Block_O extends Block {
  _position: [[Space.block, Space.block], [Space.block, Space.block]];
  _direction: 0;
  _type: BlockType.O;
}

export class Block_Z extends Block {
  _position: [
    [Space.block, Space.block, Space.empty],
    [Space.empty, Space.block, Space.block]
  ];
  _direction: 0;
  _type: BlockType.Z;
}

export class Block_S extends Block {
  _position: [
    [Space.empty, Space.block, Space.block],
    [Space.block, Space.block, Space.empty]
  ];
  _direction: 0;
  _type: BlockType.S;
}

export class Block_J extends Block {
  _position: [
    [Space.empty, Space.block],
    [Space.empty, Space.block],
    [Space.block, Space.block]
  ];
  _direction: 0;
  _type: BlockType.J;
}

export class Block_L extends Block {
  _position: [
    [Space.block, Space.empty],
    [Space.block, Space.empty],
    [Space.block, Space.block]
  ];
  _direction: 0;
  _type: BlockType.L;
}

export class Block_T extends Block {
  _position: [
    [Space.block, Space.block, Space.block],
    [Space.empty, Space.block, Space.empty],
    [Space.empty, Space.block, Space.empty]
  ];
  _direction: 0;
  _type: BlockType.T;
}
