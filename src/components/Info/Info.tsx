import React, { useContext, useState } from "react";
import fp from "lodash/fp";
import GameContext, { Progress } from "../../GameContext";

const Info = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { score, rows, level, progress } = gameState;

  const handleClickProgress = fp.curry(
    (
      progress: Progress,
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setGameState((prev) => ({ ...prev, progress }));
    }
  );

  return (
    <div role="info">
      <section role="section" aria-label="score">
        Score: {score}
      </section>
      <section role="section" aria-label="rows">
        Rows: {rows}
      </section>
      <section role="section" aria-label="level">
        Level: {level}
      </section>
      {fp.isEqual(progress, Progress.ready) ? (
        <button
          aria-label="start"
          onClick={handleClickProgress(Progress.proceeding)}
        >
          START GAME
        </button>
      ) : (
        <button aria-label="end" onClick={handleClickProgress(Progress.end)}>
          END
        </button>
      )}
    </div>
  );
};

export default Info;
