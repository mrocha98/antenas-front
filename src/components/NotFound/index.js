import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { File } from 'react-kawaii';
import { useHistory } from 'react-router-dom';
import './styles.scss';

export default function NotFound() {
  const history = useHistory();
  const [fileMood, setFileMood] = useState('ko');

  const handleMouseEnter = () => setFileMood('happy');
  const handleMouseLeave = () => setFileMood('ko');

  return (
    <article className="page page--not_found">
      <Typography variant="h1">Erro 404</Typography>
      <div className="container">
        <File mood={fileMood} color="#dfdfdf" />
      </div>
      <Typography variant="h4">Página não encontrada</Typography>
      <div className="container">
        <Button
          color="secondary"
          onClick={() => history.goBack()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Voltar à civilização
        </Button>
      </div>
    </article>
  );
}
