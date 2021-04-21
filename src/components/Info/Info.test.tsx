import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/user-event";
import GameContext, { gameState, Progress } from "../../GameContext";
import Info from "./Info";

describe("[Info]", () => {
  beforeEach(() => {
    render(
      <GameContext.Provider value={gameState}>
        <Info />
      </GameContext.Provider>
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
    it(`start 버튼을 누르면 진행상태가 ${Progress.proceeding}로 변경된다.`, () => {
      userEvent.click(screen.getByRole("button", { name: "start" }));
      expect(screen.getByRole("button", { name: "end" })).toBeInTheDocument();
    });
  });
});
