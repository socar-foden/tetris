import React, { useState } from "react";
import GameContext, { gameState } from "../../GameContext";
import Game from "../Game/Game";
import GlobalStyle from "../GlobalStyle";
import Info from "../Info/Info";
import S from "./App.style";

const App: React.FC = () => {
  const [state] = useState(gameState);

  return (
    <GameContext.Provider value={state}>
      <GlobalStyle />

      <S.Main>
        <Game />
        <Info />
      </S.Main>
    </GameContext.Provider>
  );
};

export default App;
