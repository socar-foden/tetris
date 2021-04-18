import React, { useState } from "react";
import GameContext, { gameState } from "../../GameContext";
import Game from "../Game/Game";
import GlobalStyle from "../GlobalStyle";
import Info from "../Info/Info";

const App = () => {
  const [state] = useState(gameState);

  return (
    <GameContext.Provider value={state}>
      <GlobalStyle />

      <main>
        <Game />

        <Info />
      </main>
    </GameContext.Provider>
  );
};

export default App;
