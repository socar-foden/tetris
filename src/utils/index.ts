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

export interface Location {
  d_1: number;
  d_2: number;
}

/**
 * 블럭 랜덤으로 얻기
 * @returns Block
 */
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

/**
 * space가 block상태인지 파악
 * @param space
 * @returns
 */
const isBlockSpace = (space: Space): boolean =>
  space._state === SpaceState.block;

/**
 * 각 블럭의 최상단에 위치한 조각인지 파악
 * @param location
 * @param position
 * @returns
 */
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

/**
 * 각 블럭의 최하단에 위치한 조각인지 파악
 * @param location
 * @param position
 * @returns
 */
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

/**
 * 포지션의 탐색범위를 반환
 * @param location
 * @param position
 * @returns
 */
const getRangeInfo = ({ d_1, d_2 }: Location, position: Space[][]) => [
  _.range(d_2, d_2 + position[0].length),
  _.range(d_1, d_1 + position.length),
];

/**
 * 해당 블럭의 아랫쪽이 다른 블럭에 닿았는지 파악
 * @param location
 * @param position
 * @param spaceList
 * @returns
 */
export const isTouchingBlockBelow = (
  { d_1, d_2 }: Location,
  position: Space[][],
  spaceList: Space[][]
): boolean => {
  const [range_d_2, range_d_1] = getRangeInfo({ d_1, d_2 }, position);

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

/**
 * 해당 블럭의 왼쪽이 다른 블럭에 닿았는지 파악
 * @param location
 * @param position
 * @param spaceList
 * @returns
 */
export const isTouchingBlockLeft = (
  { d_1, d_2 }: Location,
  position: Space[][],
  spaceList: Space[][]
): boolean => {
  const [range_d_2, range_d_1] = getRangeInfo({ d_1, d_2 }, position);

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

/**
 * ** 매 액션마다 게임영역을 새로 그려주는 로직
 * @param location
 * @param block
 * @param spaceList
 * @returns
 */
export const getSpaceList = (
  { d_1, d_2 }: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
  const { _position, color } = block;
  const [range_d_2, range_d_1] = getRangeInfo({ d_1, d_2 }, _position);

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

/**
 * 완전히 비어있는 게임영역을 반환
 * @returns
 */
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

/**
 * location을 기준으로, 다음 시점에 그려질 게임영역을 반환
 * @param prev
 * @param location
 * @returns
 */
export const getGameStateByLocation = (
  prev: GameState,
  location: Location
): GameState => ({
  ...prev,
  currentLocation: location,
  spaceList: getSpaceList(location, prev.currentBlock, prev.spaceList),
});

/**
 * 키보드의 각 key별, 다음 시점의 블럭을 그리는 기준이 될 location을 반환
 * @param key
 * @param location
 * @returns
 */
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
