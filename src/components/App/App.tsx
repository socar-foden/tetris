import React, { useState } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { gameState, Progress } from "../../GameContext";
import { Block_Empty } from "../../models/blocks";
import {
  getRotatedBlock,
  getGameStateByLocation,
  getSpaceList,
  Location,
  getNextLocation,
  isTouchingBlock,
  isTouchingBoundary,
  keyDirectionMap,
  overlapSomePosition,
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
      _.find(
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "],
        fp.isEqual(key)
      )
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

      setState((prev) => {
        const nextLocation: Location = getNextLocation(
          key,
          prev.currentLocation,
          prev.currentBlock._position,
          prev.spaceList
        );

        if (key === "ArrowUp") {
          const currentBlock = getRotatedBlock(prev.currentBlock);
          const isOverlap = overlapSomePosition(
            nextLocation,
            currentBlock._position,
            prev.spaceList
          );
          const touchingBoundary = isTouchingBoundary(
            key,
            nextLocation,
            currentBlock._position,
          );

          if (!isOverlap && !touchingBoundary) {
            return {
              ...prev,
              currentBlock,
              currentLocation: nextLocation,
              spaceList: getSpaceList(
                nextLocation,
                currentBlock,
                prev.spaceList
              ),
            };
          } else {
            return getGameStateByLocation(prev, prev.currentLocation);
          }
        } else if (key === " ") {
          return getGameStateByLocation(prev, nextLocation);
        } else {
          const touchingBoundary = isTouchingBoundary(
            key,
            nextLocation,
            prev.currentBlock._position
          );
          const touchingBlock = isTouchingBlock(
            keyDirectionMap[key],
            nextLocation,
            prev.currentBlock._position,
            prev.spaceList
          );

          if (!touchingBoundary && !touchingBlock) {
            return getGameStateByLocation(prev, nextLocation);
          } else {
            return getGameStateByLocation(prev, prev.currentLocation);
          }
        }
      });
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
