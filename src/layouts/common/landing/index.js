import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './styles.scss';

export default function Landing() {
  return (
    <div className="landing-page">
      <Typography variant="h1">Antenas</Typography>
      <div className="buttons">
        <Button variant="contained" color="secondary">
          <Link to="/register">Criar Conta</Link>
        </Button>
        <Button variant="contained" color="primary">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
