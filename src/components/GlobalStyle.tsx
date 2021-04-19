import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  
  #root {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
