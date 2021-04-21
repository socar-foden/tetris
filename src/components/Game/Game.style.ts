import styled from "styled-components";
import fp from "lodash/fp";

const Space = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid black;
`;

const S = {
  Game: styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid black;
    margin: 20px;
  `,
  Empty: styled(Space)`
    border: 1px dotted black;
  `,
  Block: styled(Space)`
    background-color: ${fp.get("color")};
  `,
  Disabled: styled(Space)`
    background-color: grey;
  `,
  Row: styled.div`
    display: flex;
  `,
  Space: styled.div``,
};

export default S;
