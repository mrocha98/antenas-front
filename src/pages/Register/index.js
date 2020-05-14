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
import { useForm, Controller } from 'react-hook-form';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';
import { register as createUser } from '../../services/auth';

function Register() {
  const history = useHistory();
  const { handleSubmit, register, control } = useForm();
  const { signIn } = useAuth();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const isActive = true;
    const created = await createUser(
      data.name,
      data.email,
      data.password,
      data.type,
      isActive
    );
    if (created) return signIn(data.email, data.password);
    return new Error('eita');
  };

  return (
    <PageContainer>
      <Typography variant="h2" component="h1">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm
          title="Crie uma nova conta"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Field>
            <TextField
              required
              label="Nome"
              name="name"
              variant="outlined"
              inputRef={register}
              fullWidth
              autoFocus
            />
          </Field>
          <Field>
            <TextField
              required
              label="E-mail"
              name="email"
              type="email"
              variant="outlined"
              inputRef={register}
              fullWidth
            />
          </Field>
          <Field>
            <TextField
              required
              label="Senha"
              name="password"
              type="password"
              variant="outlined"
              inputRef={register}
              fullWidth
            />
          </Field>
          <Field>
            <InputLabel required style={{ marginBottom: '0.5rem' }}>
              Categoria
            </InputLabel>
            <Controller
              name="type"
              defaultValue={3}
              control={control}
              as={
                <Select variant="outlined" fullWidth>
                  <MenuItem value={1}>Empresário</MenuItem>
                  <MenuItem value={2}>CADI</MenuItem>
                  <MenuItem value={3}>Aluno</MenuItem>
                  <MenuItem value={4}>Professor</MenuItem>
                </Select>
              }
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
