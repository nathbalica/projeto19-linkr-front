import { createGlobalStyle } from "styled-components";
import { mainColor } from "../constants/colors";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: Oswald, sans-serif; 
        font-style: normal;
        font-weight: 400;
    }

    html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}


    h1 {
        font-weight: 700;
        font-size: 26px;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        background-color: ${mainColor};
        border-radius: 6px;
        padding: 22px;

    }
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        text-decoration: none;
        padding-top: 30px;
    }
`

export default GlobalStyle