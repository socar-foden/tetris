import React, { useState } from "react";
import GameContext, { gameState } from "../../GameContext";
import Game from "../Game/Game";
import GlobalStyle from "../GlobalStyle";
import Info from "../Info/Info";
import S from "./App.style";

const App: React.FC = () => {
  const [state, setState] = useState(gameState);
  state.setGameState = setState;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
  };

  return (
    <S.Wrapper onKeyDown={handleKeyDown} tabIndex={0}>
      <GameContext.Provider value={state}>
        <GlobalStyle />

        <S.Main>
          <Game />
          <Info />
        </S.Main>
      </GameContext.Provider>
    </S.Wrapper>
  );
};

export default App;
