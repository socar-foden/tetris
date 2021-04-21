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
  protected _position: Space[][];
  _direction: number;
  protected _type: BlockType;
  protected _color: string;

  get position() {
    return this._position;
  }
  get type() {
    return this._type;
  }
  get color() {
    return this._color;
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
    this._color = "#fb3640";
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
    this._color = "#542e71";
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
    this._color = "#0061a8";
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
    this._color = "#206a5d";
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
    this._color = "#f0c929";
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
    this._color = "#96bb7c";
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
    this._color = "#763857";
  }
}
