import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import GameContext, { gameState } from "./GameContext";

ReactDOM.render(
  <GameContext.Provider value={gameState}>
    <App />
  </GameContext.Provider>,
  document.getElementById("root")
);
