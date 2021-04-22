import _ from "lodash";
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
import { Space, SpaceState } from "../models/spaces";

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

interface Location {
  d_1: number;
  d_2: number;
}

export const getSpaceList = (
  startLocation: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
  const { d_1, d_2 } = startLocation;
  const { position, border, color } = block;

  const range_d_2 = _.range(d_2, d_2 + position[0].length);
  const range_d_1 = _.range(d_1, d_1 + position.length);

  _.forEach(range_d_1, (d1, i) =>
    _.forEach(range_d_2, (d2, j) => {
      const target = cloned[d1][d2];

      if (_.isEqual(position[i][j]._state, SpaceState.block)) {
        target._border = border;
        target._color = color;
      }
    })
  );

  return cloned;
};