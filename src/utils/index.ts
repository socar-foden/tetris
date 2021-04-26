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
import { Space, SpaceState, Space_Block, Space_Empty } from "../models/spaces";

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

const isTopPositionOfBlock = (location: Location, block: Block): boolean => {
  const { position } = block;
  const { d_1, d_2 } = location;
  const isBlock = position[d_1][d_2]._state === SpaceState.block;
  let isTop = true;
  let cnt = 1;

  while (d_1 - cnt >= 0) {
    if (position[d_1 - cnt][d_2]._state === SpaceState.block) {
      isTop = false;
      break;
    }
    cnt++;
  }

  return isBlock && isTop;
};

export const getSpaceList = (
  location: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
  const { d_1, d_2 } = location;
  const { position, color } = block;

  const range_d_2 = _.range(d_2, d_2 + position[0].length);
  const range_d_1 = _.range(d_1, d_1 + position.length);

  _.forEach(range_d_1, (d1, i) =>
    _.forEach(range_d_2, (d2, j) => {
      if (_.isEqual(position[i][j]._state, SpaceState.block)) {
        cloned[d1][d2] = new Space_Block(color);

        if (
          isTopPositionOfBlock({ d_1: i, d_2: j }, block) &&
          !!cloned[d1 - 1]
        ) {
          cloned[d1 - 1][d2] = new Space_Empty();
        }
      }
    })
  );

  return cloned;
};

export const getEmptySpaceListAll = () =>
  _.times(25, () => _.times(15, () => new Space_Empty()));
