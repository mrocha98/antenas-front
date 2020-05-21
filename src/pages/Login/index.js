import React, { useState } from 'react';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';

const schema = yup.object().shape({
  email: yup.string().trim().email().required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

function Login() {
  const [signInError, setSignInError] = useState(false);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm({
    validationSchema: schema,
  });
  const { signIn } = useAuth();

  const onSubmit = async (data, event) => {
    event.preventDefault();

    try {
      await signIn(data.email, data.password);
    } catch {
      setSignInError(true);
    }
  };

  return (
    <PageContainer>
      <Typography variant="h2" component="h1">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm title="Autentique-se" onSubmit={handleSubmit(onSubmit)}>
          {signInError && (
            <Field>
              <Alert severity="error">E-mail e/ou senha inválidos.</Alert>
            </Field>
          )}
          {errors.email && (
            <Field>
              <Alert severity="warning">{errors.email.message}</Alert>
            </Field>
          )}
          <Field>
            <TextField
              name="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              variant="outlined"
              inputRef={register}
              fullWidth
              autoFocus
            />
          </Field>
          {errors.password && (
            <Field>
              <Alert severity="warning">{errors.password.message}</Alert>
            </Field>
          )}
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
