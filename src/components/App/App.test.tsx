import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import GameContext, { gameState } from "../../GameContext";

describe("[App]", () => {
  beforeEach(() => {
    render(
      <GameContext.Provider value={gameState}>
        <App />
      </GameContext.Provider>
    );
  });

  describe("구성요소 테스트", () => {
    it("game, info 영역이 존재한다.", () => {
      expect(screen.getByRole("game")).toBeInTheDocument();
      expect(screen.getByRole("info")).toBeInTheDocument();
    });
  });
});
