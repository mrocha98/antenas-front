import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import UndrawArt from '../../../assets/images/undraw_business_analytics.svg';
import './styles.scss';
import Emoji from '../../../components/Emoji';

export default function Landing() {
  return (
    <article className="landing-page">
      <nav className="landing-page-menu">
        <h1>
          <Emoji emoji="📡" title="antenna" />
          Projeto Antenas
        </h1>
        <div className="buttons">
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Criar Conta
            </Button>
          </Link>
        </div>
      </nav>
      <section className="landing-page-content">
        <img src={UndrawArt} alt="illustration" className="content-art" />
      </section>
      <footer>
        <p>
          Made with
          <Emoji emoji="❤️" name="love" />
          and
          <Emoji emoji="☕" name="coffee" />
          by &nbsp;
          <a href="https://fatecsjc-prd.azurewebsites.net/">
            <u>FATEC SJC</u>
          </a>
        </p>
      </footer>
    </article>
  );
}
