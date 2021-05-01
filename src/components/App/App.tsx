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

      // TODO: 아래 키보드 로직은 따른데로 좀 분리해야 함
      // TODO: 아래 키보드 로직은 따른데로 좀 분리해야 함
      // TODO: 아래 키보드 로직은 따른데로 좀 분리해야 함
      // TODO: 아래 키보드 로직은 따른데로 좀 분리해야 함
      if (key === "ArrowUp") {
        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
        // TODO: 회전시 주변 어느 블록과도 겹치지 않아야 함
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
      } else if (key === "ArrowLeft") {
        setState((prev) => {
          const nextLocation: Location = {
            ...prev.currentLocation,
            d_2: prev.currentLocation.d_2 - 1,
          };

          const touchingLeft = nextLocation.d_2 < 0;

          if (!touchingLeft) {
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
      } else if (key === "ArrowRight") {
        setState((prev) => {
          const nextLocation: Location = {
            ...prev.currentLocation,
            d_2: prev.currentLocation.d_2 + 1,
          };

          const touchingRight =
            nextLocation.d_2 + prev.currentBlock._position[0].length > 15;

          if (!touchingRight) {
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
