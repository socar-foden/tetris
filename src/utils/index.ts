import _ from "lodash";
import fp from "lodash/fp";
import { GameState } from "../GameContext";
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

const isTopOfPosition = (
  { d_1, d_2 }: Location,
  position: Space[][]
): boolean => {
  const isBlock = isBlockSpace(position[d_1][d_2]);
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

const isBottomOfPosition = (
  { d_1, d_2 }: Location,
  position: Space[][]
): boolean => {
  const isBlock = isBlockSpace(position[d_1][d_2]);
  let isBottom = true;
  let cnt = 1;

  while (d_1 + cnt < position.length) {
    if (position[d_1 + cnt][d_2]._state === SpaceState.block) {
      isBottom = false;
      break;
    }
    cnt++;
  }

  return isBlock && isBottom;
};

export const isTouchingBlockBelow = (
  { d_1, d_2 }: Location,
  position: Space[][],
  spaceList: Space[][]
): boolean => {
  const range_d_2 = _.range(d_2, d_2 + position[0].length);
  const range_d_1 = _.range(d_1, d_1 + position.length);

  return _.some(range_d_1, (d1, i) =>
    _.some(
      range_d_2,
      (d2, j) =>
        isBottomOfPosition({ d_1: i, d_2: j }, position) &&
        spaceList[d1] &&
        isBlockSpace(spaceList[d1][d2])
    )
  );
};

export const getSpaceList = (
  { d_1, d_2 }: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
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
          isTopOfPosition({ d_1: i, d_2: j }, block._position) &&
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

export const getRotatedBlock = (block: Block): Block => {
  const rotated: Block = _.cloneDeep(block);
  const { _position } = rotated;
  const rotatedPosition: Space[][] = [];

  _.forEach(_position[0], (row, i) => {
    const inner = [];
    _.forEach(_position, (space, j) => {
      inner.push(_position[j][i]);
    });
    rotatedPosition.unshift(inner);
  });

  rotated._position = rotatedPosition;

  return rotated;
};

export const getGameStateByLocation = (
  prev: GameState,
  location: Location
): GameState => ({
  ...prev,
  currentLocation: location,
  spaceList: getSpaceList(location, prev.currentBlock, prev.spaceList),
});

export const getNextLocation = (key: string, location: Location): Location =>
  fp.flow(
    fp.find((item: any) => fp.isEqual(item.key, key)),
    fp.get("nextLocation")
  )([
    {
      key: "ArrowUp",
      nextLocation: { ...location },
    },
    {
      key: "ArrowDown",
      nextLocation: {
        ...location,
        d_1: location.d_1 + 1,
      },
    },
    {
      key: "ArrowLeft",
      nextLocation: {
        ...location,
        d_2: location.d_2 - 1,
      },
    },
    {
      key: "ArrowRight",
      nextLocation: {
        ...location,
        d_2: location.d_2 + 1,
      },
    },
  ]);
