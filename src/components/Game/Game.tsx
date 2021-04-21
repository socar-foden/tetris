import React, { useContext, useState } from "react";
import _ from "lodash";
import S from "./Game.style";
import When from "../When/When";
import GameContext from "../../GameContext";
import { Space } from "../../models/blocks";

const Game = () => {
  const gameContext = useContext(GameContext);
  const [gameState] = useState(gameContext);
  const { spaceList } = gameState;

  return (
    <S.Game role="game">
      {_.map(spaceList, (rows, index) => (
        <S.Row key={index}>
          {_.map(rows, (space, index) => (
            <S.Space key={index}>
              <When condition={_.isEqual(space, Space.empty)}>
                <S.Empty />
              </When>
              <When condition={_.isEqual(space, Space.block)}>
                <S.Block />
              </When>
              <When condition={_.isEqual(space, Space.disabled)}>
                <S.Disabled />
              </When>
            </S.Space>
          ))}
        </S.Row>
      ))}
    </S.Game>
  );
};

export default Game;
