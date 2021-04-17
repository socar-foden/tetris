import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("test", () => {
  beforeEach(() => {
    render(<App />);
  });

  describe("구성요소 테스트", () => {
    it("게임영역, 시작버튼, level, rows, score 영역이 존재한다.", () => {
      expect(screen.getByRole("game")).toBeInTheDocument();
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
});
