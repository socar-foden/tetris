import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import S from "./Game.style";
import GameContext from "../../GameContext";
import { Space } from "../../models/spaces";
import { Block } from "../../models/blocks";

interface Location {
  d_1: number;
  d_2: number;
}

const getSpaceList = (
  startLocation: Location,
  block: Block,
  spaceList: Space[][]
): Space[][] => {
  const cloned = _.cloneDeep(spaceList);
  const { d_1, d_2 } = startLocation;
  const { position } = block;

  const range_d_2 = _.range(d_2, d_2 + position[0].length);
  const range_d_1 = _.range(d_1, d_1 + position.length);

  _.forEach(range_d_1, (d1) =>
    _.forEach(range_d_2, (d2) => {
      const target = cloned[d1][d2];

      target._border = block.border;
      target._color = block.color;
    })
  );

  return cloned;
};

const Game = () => {
  const gameContext = useContext(GameContext);
  const [gameState, setGameState] = useState(gameContext);
  const { spaceList, nextList } = gameState;

  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      spaceList: getSpaceList({ d_1: 0, d_2: 7 }, nextList[0], prev.spaceList),
    }));
  }, []);

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
