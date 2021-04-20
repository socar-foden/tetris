import React, { useContext, useState } from "react";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";
import S from "./Info.style";
import When from "../When/When";

const Info: React.FC = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { score, rows, level, progress } = gameState;

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
