import React, { useContext } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";
import S from "./Info.style";
import Game_S from "../Game/Game.style";
import When from "../When/When";
import { Block, Block_Empty } from "../../models/blocks";
import { Space, SpaceState } from "../../models/spaces";
import {
  Direction,
  getEmptySpaceListAll,
  getGameStateByLocation,
  getRandomBlock,
  getSpaceList,
  isTouchingBlock,
  getNextLocation,
  isTouchingBoundary,
} from "../../utils";
import { Location } from "../../utils/index";

let reqId;
let frame = 0;
const startLocation: Location = { d_1: 0, d_2: 7 };

const Info: React.FC = () => {
  const gameContext = useContext(GameContext);
  const { score, rows, level, progress, nextList, setGameState } = gameContext;
  const isReady = fp.isEqual(progress, Progress.ready);

  const step = (timestamp) => {
    frame++;

    if (frame % 60 === 0) {
      setGameState((prev) => {
        return {
          ...prev,
          spaceList: getSpaceList(
            prev.currentLocation,
            new Block_Empty(prev.currentBlock._position),
            prev.spaceList
          ),
        };
      });

      setGameState((prev) => {
        const nextLocation: Location = getNextLocation(
          "ArrowDown",
          prev.currentLocation,
          prev.currentBlock._position,
          prev.spaceList
        );
        const touchingFloor = isTouchingBoundary(
          "ArrowDown",
          nextLocation,
          prev.currentBlock._position
        );
        const touchingBlockBelow = isTouchingBlock(
          Direction.Bottom,
          nextLocation,
          prev.currentBlock._position,
          prev.spaceList
        );

        if (!touchingFloor && !touchingBlockBelow) {
          return getGameStateByLocation(prev, nextLocation);
        } else {
          return {
            ...getGameStateByLocation(prev, prev.currentLocation),
            currentBlock: prev.nextList[0],
            nextList: [prev.nextList[1], getRandomBlock()],
            currentLocation: startLocation,
          };
        }
      });
    }

    reqId = requestAnimationFrame(step);
  };

  const handleClickStart = () => {
    let currentBlock = getRandomBlock();

    setGameState((prev) => ({
      ...prev,
      spaceList: getEmptySpaceListAll(),
    }));

    setGameState((prev) => ({
      ...prev,
      progress: Progress.proceeding,
      currentBlock,
      currentLocation: startLocation,
      nextList: [getRandomBlock(), getRandomBlock()],
      spaceList: getSpaceList(startLocation, currentBlock, prev.spaceList),
    }));

    reqId = requestAnimationFrame(step);
  };

  const handleClickEnd = () => {
    cancelAnimationFrame(reqId);
    setGameState((prev) => ({ ...prev, progress: Progress.ready }));
  };

  return (
    <S.Info role="info">
      <section role="section" aria-label="next">
        Next:
      </section>
      <S.NextInformation>
        {_.map(nextList, (next: Block, index) => (
          <S.RowWrapper key={index}>
            {_.map(next._position, (rows: Space[], index) => (
              <Game_S.Row key={index}>
                {_.map(rows, (space: Space, indexR) => (
                  <Game_S.Space
                    key={indexR}
                    color={space._color}
                    border={
                      _.isEqual(space._state, SpaceState.block)
                        ? space._border
                        : "1px solid rgb(0, 0, 0, 0)"
                    }
                  />
                ))}
              </Game_S.Row>
            ))}
          </S.RowWrapper>
        ))}
      </S.NextInformation>
      <section role="section" aria-label="score">
        Score: {score}
      </section>
      <section role="section" aria-label="rows">
        Rows: {rows}
      </section>
      <section role="section" aria-label="level">
        Level: {level}
      </section>
      <When condition={isReady}>
        <button aria-label="start" onClick={handleClickStart}>
          START
        </button>
      </When>
      <When condition={!isReady}>
        <button aria-label="end" onClick={handleClickEnd}>
          END
        </button>
      </When>
    </S.Info>
  );
};

export default Info;
