import React from "react";

const App = () => {
  return (
    <main>
      <div role="game"></div>

      <section role="section" aria-label="level"></section>
      <section role="section" aria-label="rows"></section>
      <section role="section" aria-label="score"></section>
      <button aria-label="start">START GAME</button>
    </main>
  );
};

export default App;
