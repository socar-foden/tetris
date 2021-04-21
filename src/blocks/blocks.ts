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
  _direction: number;
  protected _type: BlockType;

  get position() {
    return this._position;
  }
  get type() {
    return this._type;
  }
}

export class Block_I extends Block {
  constructor() {
    super();

    this._position = [
      [Space.block],
      [Space.block],
      [Space.block],
      [Space.block],
    ];
    this._direction = 0;
    this._type = BlockType.I;
  }
}

export class Block_O extends Block {
  constructor() {
    super();

    this._position = [
      [Space.block, Space.block],
      [Space.block, Space.block],
    ];
    this._direction = 0;
    this._type = BlockType.O;
  }
}

export class Block_Z extends Block {
  constructor() {
    super();

    this._position = [
      [Space.block, Space.block, Space.empty],
      [Space.empty, Space.block, Space.block],
    ];
    this._direction = 0;
    this._type = BlockType.Z;
  }
}

export class Block_S extends Block {
  constructor() {
    super();

    this._position = [
      [Space.empty, Space.block, Space.block],
      [Space.block, Space.block, Space.empty],
    ];
    this._direction = 0;
    this._type = BlockType.S;
  }
}

export class Block_J extends Block {
  constructor() {
    super();

    this._position = [
      [Space.empty, Space.block],
      [Space.empty, Space.block],
      [Space.block, Space.block],
    ];
    this._direction = 0;
    this._type = BlockType.J;
  }
}

export class Block_L extends Block {
  constructor() {
    super();

    this._position = [
      [Space.block, Space.empty],
      [Space.block, Space.empty],
      [Space.block, Space.block],
    ];
    this._direction = 0;
    this._type = BlockType.L;
  }
}

export class Block_T extends Block {
  constructor() {
    super();

    this._position = [
      [Space.block, Space.block, Space.block],
      [Space.empty, Space.block, Space.empty],
      [Space.empty, Space.block, Space.empty],
    ];
    this._direction = 0;
    this._type = BlockType.T;
  }
}
