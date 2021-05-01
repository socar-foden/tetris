import React, { useContext } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";
import S from "./Info.style";
import Game_S from "../Game/Game.style";
import When from "../When/When";
import { Block } from "../../models/blocks";
import { Space, SpaceState } from "../../models/spaces";
import {
  getEmptySpaceListAll,
  getRandomBlock,
  getSpaceList,
  isTouchingBlockBelow,
} from "../../utils";
import { Location } from "../../utils/index";

let timeout;

const Info: React.FC = () => {
  const gameContext = useContext(GameContext);
  const { score, rows, level, progress, nextList, setGameState } = gameContext;
  const isReady = fp.isEqual(progress, Progress.ready);

  const handleClickStart = () => {
    let currentBlock = getRandomBlock();
    const startLocation: Location = { d_1: 0, d_2: 7 };

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

    timeout = setInterval(() => {
      setGameState((prev) => {
        const nextLocation: Location = {
          ...prev.currentLocation,
          d_1: prev.currentLocation.d_1 + 1,
        };

        const touchingFloor =
          nextLocation.d_1 + prev.currentBlock._position.length > 25;
        const touchingBlockBelow = isTouchingBlockBelow(
          nextLocation,
          prev.currentBlock._position,
          prev.spaceList
        );

        if (!touchingFloor && !touchingBlockBelow) {
          return {
            ...prev,
            currentLocation: nextLocation,
            spaceList: getSpaceList(
              nextLocation,
              prev.currentBlock,
              prev.spaceList
            ),
          };
        } else {
          return {
            ...prev,
            currentBlock: prev.nextList[0],
            currentLocation: startLocation,
            nextList: [prev.nextList[1], getRandomBlock()],
          };
        }
      });
    }, 1000);
  };

  const handleClickEnd = () => {
    clearInterval(timeout);
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
