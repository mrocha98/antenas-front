import styled from 'styled-components';

export const Nav = styled.nav`
  --text-primary: #fcfaf9;
  --text-secondary: #eff1f3;
  --bg-primary: #333333;
  --bg-secondary: #cc8b86;
  --transition-speed: 400ms;

  position: fixed;
  background-color: var(--bg-primary);
  transition: width 600ms ease;
  z-index: 10;

  &:hover {
    .logo {
      svg {
        transform: rotate(-180deg);
      }
    }
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
  }

  .nav-item {
    width: 100%;

    &:last-child {
      margin-top: auto;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-primary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--transition-speed);

    &:hover {
      filter: grayscale(0%) opacity(1);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      font-weight: bolder;
    }

    svg {
      width: 2rem;
      min-width: 2rem;
      margin: 0 1.5rem;
    }
  }

  .link-text {
    display: none;
    margin-left: 1rem;
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;

    svg {
      transform: rotate(0deg);
      transition: var(--transition-speed);
    }
  }

  .logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--transition-speed);
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    bottom: 0;
    width: 100vw;
    height: 5rem;
    display: flex;
    align-items: center;

    .logo {
      display: none;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .nav-item {
      &:last-child {
        margin: 0;
      }

      .nav-link {
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
      }
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    top: 0;
    width: 5rem;
    height: 100vh;

    .nav-link {
      font-size: 1.25rem;
    }

    &:hover {
      width: 16rem;
      .link-text {
        display: inline;
      }

      .logo {
        svg {
          margin-left: 11rem;
        }
      }

      .logo-text {
        left: 0px;
      }
    }
  }
`;
