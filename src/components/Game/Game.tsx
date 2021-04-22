import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import S from "./Game.style";
import GameContext from "../../GameContext";
import { getSpaceList } from "../../utils";

const Game = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { spaceList, nextList } = gameState;

  // useEffect(() => {
  //   setGameState((prev) => ({
  //     ...prev,
  //     spaceList: getSpaceList({ d_1: 0, d_2: 7 }, nextList[0], prev.spaceList),
  //   }));
  // }, []);

  return (
    <S.Game role="game">
      {_.map(spaceList, (rows, index) => (
        <S.Row key={index}>
          {_.map(rows, (space, index) => (
            <S.Space key={index} color={space._color} border={space._border} />
          ))}
        </S.Row>
      ))}
    </S.Game>
  );
};

export default Game;
