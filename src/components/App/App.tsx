import React from "react";
import GameContext, { GameState } from "../../GameContext";
import GlobalStyle from "../GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />

      <main>
        <div role="game"></div>

        <GameContext.Consumer>
          {(value: GameState) => value.level}
        </GameContext.Consumer>

        <section role="section" aria-label="level"></section>
        <section role="section" aria-label="rows"></section>
        <section role="section" aria-label="score"></section>
        <button aria-label="start">START GAME</button>
      </main>
    </>
  );
};

export default App;
