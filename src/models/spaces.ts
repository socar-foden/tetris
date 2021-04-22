export const enum SpaceState {
  empty,
  block,
  disabled,
}

export class Space {
  _state: SpaceState;
  _color: string;
  _border: string;

  constructor() {
    this._border = "1px dotted black";
    this._color = "";
  }
}

export class Space_Empty extends Space {
  constructor() {
    super();

    this._state = SpaceState.empty;
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
  }
}
