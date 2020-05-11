import React from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';

function Login() {
  const { signIn } = useAuth();
  const history = useHistory();

  async function handleSignIn() {
    return signIn();
  }

  return (
    <PageContainer>
      <Typography variant="h2" component="h1">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm title="Autentique-se">
          <Field>
            <TextField
              required
              label="E-mail"
              type="email"
              variant="outlined"
              fullWidth
              autoFocus
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
          <Field applyHugeDistance>
            <Button
              variant="contained"
              type="submit"
              size="large"
              color="primary"
              onClick={handleSignIn}
            >
              Confirmar
            </Button>
          </Field>
          <Divider variant="middle" />
          <Button
            variant="text"
            color="primary"
            onClick={() => history.push('/register')}
            style={{ marginTop: '1em' }}
          >
            Criar conta
          </Button>
        </AuthForm>
      </AuthCard>
    </PageContainer>
  );
}

export default Login;
