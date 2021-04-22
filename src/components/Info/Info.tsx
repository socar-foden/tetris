import React, { useContext } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";
import S from "./Info.style";
import Game_S from "../Game/Game.style";
import When from "../When/When";
import { Block } from "../../models/blocks";
import { Space, SpaceState } from "../../models/spaces";
import { getRandomBlock } from "../../utils";

const Info: React.FC = () => {
  const gameContext = useContext(GameContext);
  const { score, rows, level, progress, nextList, setGameState } = gameContext;

  const isReady = fp.isEqual(progress, Progress.ready);

  const handleClickStart = () => {
    setGameState((prev) => ({
      ...prev,
      progress: Progress.proceeding,
      nextList: [getRandomBlock(), getRandomBlock()],
    }));
  };

  const handleClickEnd = () => {
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
            {_.map(next.position, (rows: Space[], index) => (
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
