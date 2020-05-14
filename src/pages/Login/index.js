import React from 'react';
import { Typography, TextField, Button, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';

function Login() {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const { signIn } = useAuth();

  const onSubmit = (data, event) => {
    event.preventDefault();
    signIn(data.email, data.password);
  };

  return (
    <PageContainer>
      <Typography variant="h2" component="h1">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm
          title="Autentique-se"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Field>
            <TextField
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              variant="outlined"
              inputRef={register}
              fullWidth
            />
          </Field>
          <Field>
            <TextField
              name="password"
              label="Senha"
              type="password"
              autoComplete="password"
              variant="outlined"
              inputRef={register}
              fullWidth
            />
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
