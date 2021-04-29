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
  BlockType,
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

export interface Location {
  d_1: number;
  d_2: number;
}

const isBlockSpace = (space: Space): boolean =>
  space._state === SpaceState.block;

const isTopPositionOfBlock = (location: Location, block: Block): boolean => {
  const { _position } = block;
  const { d_1, d_2 } = location;
  const isBlock = isBlockSpace(_position[d_1][d_2]);
  let isTop = true;
  let cnt = 1;

  while (d_1 - cnt >= 0) {
    if (_position[d_1 - cnt][d_2]._state === SpaceState.block) {
      isTop = false;
      break;
    }
    cnt++;
  }

  return isBlock && isTop;
};

const isBottomPositionOfBlock = (location: Location, block: Block): boolean => {
  const { _position } = block;
  const { d_1, d_2 } = location;
  const isBlock = isBlockSpace(_position[d_1][d_2]);
  let isBottom = true;
  let cnt = 1;

  while (d_1 + cnt < _position.length) {
    if (_position[d_1 + cnt][d_2]._state === SpaceState.block) {
      isBottom = false;
      break;
    }
    cnt++;
  }

  return isBlock && isBottom;
};

export const isTouchingAnotherBlock = (
  location: Location,
  block: Block,
  spaceList: Space[][]
): boolean => {
  const { _position } = block;
  const { d_1, d_2 } = location;

  const range_d_2 = _.range(d_2, d_2 + _position[0].length);
  const range_d_1 = _.range(d_1, d_1 + _position.length);

  return _.some(range_d_1, (d1, i) =>
    _.some(
      range_d_2,
      (d2, j) =>
        isBottomPositionOfBlock({ d_1: i, d_2: j }, block) &&
        spaceList[d1] &&
        isBlockSpace(spaceList[d1][d2])
    )
  );
};

export const getSpaceList = (
  location: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
  const { d_1, d_2 } = location;
  const { _position, color } = block;

  const range_d_2 = _.range(d_2, d_2 + _position[0].length);
  const range_d_1 = _.range(d_1, d_1 + _position.length);

  _.forEach(range_d_1, (d1, i) =>
    _.forEach(range_d_2, (d2, j) => {
      if (isBlockSpace(_position[i][j])) {
        if (block.type === BlockType.Empty) {
          cloned[d1][d2] = new Space_Empty();
        } else {
          cloned[d1][d2] = new Space_Block(color);
        }

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
