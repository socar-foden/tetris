import styled from "styled-components";
import fp from "lodash/fp";

interface S_SpaceProps {
  color: string;
  border: string;
}

const S = {
  Game: styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    margin: 20px;
  `,
  Row: styled.div`
    display: flex;
  `,
  Space: styled.div<S_SpaceProps>`
    width: 18px;
    height: 18px;
    background-color: ${fp.get("color")};
    border: ${fp.get("border")};
  `,
};

export default S;
