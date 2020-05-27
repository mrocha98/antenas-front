import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthCard from '../../../components/AuthCard';
import AuthForm from '../../../components/AuthForm';
import Field from '../../../components/Field';
import { useAuth } from '../../../contexts/auth';
import schema from './schema';

function Login() {
  const [signInError, setSignInError] = useState({
    display: false,
    message: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });
  const { signIn } = useAuth();

  const handleShowPassword = () => setShowPassword(!showPassword);
  const choosePasswordIcon = () => (showPassword ? <FaEye /> : <FaEyeSlash />);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { email, password } = data;
    try {
      await signIn({ email, password });
    } catch (err) {
      setSignInError({ display: true, message: err.response.data.error });
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" align="center">
            Antenas
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthCard>
            <AuthForm title="Autentique-se" onSubmit={handleSubmit(onSubmit)}>
              {signInError.display && (
                <Field>
                  <Alert severity="error">{signInError.message}</Alert>
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
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Field>
              <Field>
                <TextField
                  name="password"
                  label="Senha"
                  type={showPassword ? 'password' : 'text'}
                  autoComplete="password"
                  variant="outlined"
                  inputRef={register}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        color="default"
                        size="small"
                        onClick={handleShowPassword}
                      >
                        {choosePasswordIcon()}
                      </IconButton>
                    ),
                  }}
                />
              </Field>
              <Field applyHugeDistance>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  color="primary"
                  fullWidth
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
