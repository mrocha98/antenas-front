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
  --deep-carmine: #A4243B;
  --dark-vanilla: #D8C99B;
  --gainsboro: #EADEDA;
  --eerie-black: #121420;
  --dark-sea-green: #7EBC89;

    background: var(--dark-vanilla);
    -webkit-font-smoothing: antialiased !important;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--gainsboro);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--eerie-black);
    }
  }

  body, input, textarea, button {
    color: var(--eerie-black);
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
