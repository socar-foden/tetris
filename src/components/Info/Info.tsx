import React, { useContext, useState } from "react";
import fp from "lodash/fp";
import GameContext, { GameState, Progress } from "../../GameContext";

const Info = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { score, rows, level, progress } = gameState;

  const handleClickStart = () => {
    setGameState((prev) => ({ ...prev, progress: Progress.proceeding }));
  };

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
        <button aria-label="start" onClick={handleClickStart}>
          START GAME
        </button>
      ) : (
        <button aria-label="end">END</button>
      )}
    </div>
  );
};

export default Info;
