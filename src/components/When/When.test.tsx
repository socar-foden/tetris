import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import When from "./When";

describe("[When]", () => {
  describe("기능 테스트", () => {
    it("condition props가 true이면 children을 렌더링한다.", () => {
      render(
        <When condition={true}>
          <div role="test-div">test</div>
        </When>
      );

      expect(screen.getByRole("test-div")).toBeInTheDocument();
    });

    it("condition props가 false이면 children을 렌더링하지 않는다.", () => {
      render(
        <When condition={false}>
          <div role="test-div">test</div>
        </When>
      );

      expect(screen.queryByRole("test-div")).not.toBeInTheDocument();
    });
  });
});
