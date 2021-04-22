import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import GameContext, { gameState, Progress } from "../../GameContext";
import Info from "./Info";

const BindSetGameState: React.FC = ({ children }) => {
  const [state, setState] = useState(gameState);
  state.setGameState = setState;

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>;
};

describe("[Info]", () => {
  beforeEach(() => {
    render(
      <BindSetGameState>
        <Info />
        <GameContext.Consumer>
          {({ nextList, progress }) => (
            <>
              <span data-testid="next-length">{nextList.length}</span>
              <span data-testid="progress">{progress}</span>
            </>
          )}
        </GameContext.Consumer>
      </BindSetGameState>
    );
  });

  describe("구성요소 테스트", () => {
    it("시작버튼, level, rows, score, next 영역이 존재한다.", () => {
      expect(screen.getByRole("section", { name: "next" })).toBeInTheDocument();
      expect(
        screen.getByRole("section", { name: "level" })
      ).toBeInTheDocument();
      expect(screen.getByRole("section", { name: "rows" })).toBeInTheDocument();
      expect(
        screen.getByRole("section", { name: "score" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "start" })).toBeInTheDocument();
    });
  });

  describe("상태 테스트", () => {
    describe(`start 버튼을 누르면`, () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole("button", { name: "start" }));
      });

      it(`진행상태가 ${Progress.proceeding}로 변경된다.`, () => {
        expect(Number(screen.getByTestId("progress").textContent)).toBe(
          Progress.proceeding
        );
      });

      it(`후보 블럭 리스트가 2개로 초기화된다.`, () => {
        expect(Number(screen.getByTestId("next-length").textContent)).toBe(2);
      });
    });
  });
});
