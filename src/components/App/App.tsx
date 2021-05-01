import React, { useState } from "react";
import _ from "lodash";
import fp from "lodash/fp";
import GameContext, { gameState, Progress } from "../../GameContext";
import { Block_Empty } from "../../models/blocks";
import {
  getRotatedBlock,
  getGameStateByLocation,
  getSpaceList,
  isTouchingBlockBelow,
  Location,
  getNextLocation,
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
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
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
          prev.currentLocation
        );

        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
        if (key === "ArrowUp") {
          const currentBlock = getRotatedBlock(prev.currentBlock);

          return {
            ...prev,
            currentBlock,
            currentLocation: nextLocation,
            spaceList: getSpaceList(nextLocation, currentBlock, prev.spaceList),
          };
        } else if (key === "ArrowDown") {
          const touchingFloor =
            nextLocation.d_1 + prev.currentBlock._position.length > 25;
          const touchingBlockBelow = isTouchingBlockBelow(
            nextLocation,
            prev.currentBlock._position,
            prev.spaceList
          );

          if (!touchingFloor && !touchingBlockBelow) {
            return getGameStateByLocation(prev, nextLocation);
          } else {
            return getGameStateByLocation(prev, prev.currentLocation);
          }
        } else if (key === "ArrowLeft") {
          const touchingLeft = nextLocation.d_2 < 0;

          if (!touchingLeft) {
            return getGameStateByLocation(prev, nextLocation);
          } else {
            return getGameStateByLocation(prev, prev.currentLocation);
          }
        } else if (key === "ArrowRight") {
          const touchingRight =
            nextLocation.d_2 + prev.currentBlock._position[0].length > 15;

          if (!touchingRight) {
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
