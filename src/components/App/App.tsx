import React, { useState } from "react";
import GameContext, { gameState, Progress } from "../../GameContext";
import { Block_Empty } from "../../models/blocks";
import { getRotatedBlock, getSpaceList } from "../../utils";
import Game from "../Game/Game";
import GlobalStyle from "../GlobalStyle";
import Info from "../Info/Info";
import S from "./App.style";

const App: React.FC = () => {
  const [state, setState] = useState(gameState);
  state.setGameState = setState;
  const { progress } = state;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);

    const { key } = e;

    if (progress === Progress.proceeding) {
      if (key === "ArrowUp") {
        setState((prev) => {
          return {
            ...prev,
            spaceList: getSpaceList(
              prev.currentLocation,
              new Block_Empty(prev.currentBlock._position),
              prev.spaceList
            ),
          };
        });

        setState((prev) => {
          const currentBlock = getRotatedBlock(prev.currentBlock);

          return {
            ...prev,
            currentBlock,
            spaceList: getSpaceList(
              prev.currentLocation,
              currentBlock,
              prev.spaceList
            ),
          };
        });
      }
    }
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
