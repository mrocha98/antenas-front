import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #fcfaf9;
    -webkit-font-smoothing: antialiased !important;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    /* fundo do scroll */
    &::-webkit-scrollbar-track {
      background: #eff1f3;
    }

    /* barrinha do scroll */
    &::-webkit-scrollbar-thumb {
      background: #333333;
    }
  }

  body, input, textarea, button {
    color: #333333;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }


  #root {
    .page {
      padding: 1rem;

      /* Small screens */
      @media only screen and (max-width: 600px) {
        margin: 0.15rem;
        padding-bottom: 25%;
      }

      /* Large screens */
      @media only screen and (min-width: 600px) {
        margin: 0.75rem 5rem;
        margin-left: 10rem;
        padding-bottom: 5%;
      }
    }
  }

`;
