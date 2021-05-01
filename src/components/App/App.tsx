import React, { useState } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { gameState, Progress } from "../../GameContext";
import { Block_Empty } from "../../models/blocks";
import {
  getRotatedBlock,
  getSpaceList,
  isTouchingAnotherBlock,
  Location,
} from "../../utils";
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

    if (
      progress === Progress.proceeding &&
      _.find(["ArrowUp", "ArrowDown"], fp.isEqual(key))
    ) {
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

      if (key === "ArrowUp") {
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
      } else if (key === "ArrowDown") {
        setState((prev) => {
          const nextLocation: Location = {
            ...prev.currentLocation,
            d_1: prev.currentLocation.d_1 + 1,
          };

          const touchingFloor =
            nextLocation.d_1 + prev.currentBlock._position.length > 25;
          const touchingBlock = isTouchingAnotherBlock(
            nextLocation,
            prev.currentBlock,
            prev.spaceList
          );

          if (!touchingFloor && !touchingBlock) {
            return {
              ...prev,
              currentLocation: nextLocation,
              spaceList: getSpaceList(
                nextLocation,
                prev.currentBlock,
                prev.spaceList
              ),
            };
          } else {
            return {
              ...prev,
              currentLocation: prev.currentLocation,
              spaceList: getSpaceList(
                prev.currentLocation,
                prev.currentBlock,
                prev.spaceList
              ),
            };
          }
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
