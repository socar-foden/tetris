import React, { useContext, useState } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";
import S from "./Info.style";
import Game_S from "../Game/Game.style";
import When from "../When/When";
import { Block } from "../../models/blocks";
import { Space } from "../../models/spaces";

const Info: React.FC = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { score, rows, level, progress, nextList } = gameState;

  const isReady = fp.isEqual(progress, Progress.ready);

  const handleClickProgress = fp.curry(
    (
      progress: Progress,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setGameState((prev) => ({ ...prev, progress }));
    }
  );

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
                    border={space._border}
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
        <button
          aria-label="start"
          onClick={handleClickProgress(Progress.proceeding)}
        >
          START
        </button>
      </When>
      <When condition={!isReady}>
        <button aria-label="end" onClick={handleClickProgress(Progress.end)}>
          END
        </button>
      </When>
    </S.Info>
  );
};

export default Info;
