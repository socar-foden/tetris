export const enum SpaceState {
  empty,
  block,
  disabled,
}

export class Space {
  _state: SpaceState;
  _color: string;
  _border: string;
}

export class Space_Empty extends Space {
  constructor() {
    super();

    this._state = SpaceState.empty;
    this._color = "white";
    this._border = "1px dotted black";
  }
}

export class Space_Block extends Space {
  constructor(color: string) {
    super();

    this._state = SpaceState.block;
    this._color = color;
    this._border = "1px solid black";
  }
}

export class Space_Disabled extends Space {
  constructor() {
    super();

    this._state = SpaceState.disabled;
    this._color = "grey";
    this._border = "1px solid black";
  }
}
