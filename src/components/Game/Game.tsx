import React, { useContext } from "react";
import _ from "lodash";
import S from "./Game.style";
import GameContext from "../../GameContext";

const Game = () => {
  const gameContext = useContext(GameContext);
  const { spaceList } = gameContext;

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
