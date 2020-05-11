import React from 'react';
import {
  Typography,
  TextField,
  Select,
  Button,
  Divider,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';

function Register() {
  const history = useHistory();
  return (
    <PageContainer>
      <Typography variant="h2" component="h1">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm title="Crie uma nova conta">
          <Field>
            <TextField
              required
              label="Nome"
              variant="outlined"
              fullWidth
              autoFocus
            />
          </Field>
          <Field>
            <TextField
              required
              label="E-mail"
              type="email"
              variant="outlined"
              fullWidth
            />
          </Field>
          <Field>
            <TextField
              required
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
            />
          </Field>
          <Field>
            <InputLabel required style={{ marginBottom: '0.5rem' }}>
              Categoria
            </InputLabel>
            <Select variant="outlined" fullWidth>
              <MenuItem value="CADI">CADI</MenuItem>
              <MenuItem value="Empresário">Empresário</MenuItem>
              <MenuItem value="Professor">Professor</MenuItem>
              <MenuItem value="Aluno">Aluno</MenuItem>
            </Select>
          </Field>
          <Field applyHugeDistance>
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="primary"
            >
              Confirmar
            </Button>
          </Field>
          <Divider variant="middle" />
          <Button
            variant="text"
            color="primary"
            onClick={() => history.push('/')}
            style={{ marginTop: '1em' }}
          >
            Já tenho uma conta
          </Button>
        </AuthForm>
      </AuthCard>
    </PageContainer>
  );
}

export default Register;
