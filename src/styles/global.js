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
    --jet: #333333;
    --anti-flash-white: #eff1f3;
    --snow: #fcfaf9;
    --puce: #cc8b86;
    --medium-spring-green: #20fc8f;

    background: var(--snow);
    -webkit-font-smoothing: antialiased !important;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    /* fundo do scroll */
    &::-webkit-scrollbar-track {
      background: var(--anti-flash-white);
    }

    /* barrinha do scroll */
    &::-webkit-scrollbar-thumb {
      background: var(--jet);
    }
  }

  body, input, textarea, button {
    color: var(--jet);
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
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
        padding-bottom: 5%;
      }
    }
  }

`;
