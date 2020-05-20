import React, { useState, useEffect } from 'react';
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
import UserTypes from '../../utils/UserTypes';
import PageContainer from '../../components/PageContainer';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';
import { register as createUser } from '../../services/auth';
import CADIFields from './CadiFields';
import EmpresarioFields from './EmpresarioFields';

function Register() {
  const history = useHistory();
  const { handleSubmit, register, control, watch } = useForm();
  const { signIn } = useAuth();
  const [selectedType, setSelectedType] = useState(UserTypes.ALUNO);
  const typeWatcher = watch('type');

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const isActive = true;

    try {
      const created = await createUser(
        data.name,
        data.email,
        data.password,
        data.type,
        isActive
      );
      if (created) {
        await signIn(data.email, data.password);
        history.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (typeWatcher !== selectedType) setSelectedType(typeWatcher);
  }, [typeWatcher, selectedType]);

  const ExtraFields = () => {
    switch (selectedType) {
      case UserTypes.CADI:
        return <CADIFields register={register} />;
      case UserTypes.EMPRESARIO:
        return <EmpresarioFields register={register} />;
      default:
        return null;
    }
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
              defaultValue={UserTypes.ALUNO}
              control={control}
              as={
                <Select variant="outlined" fullWidth>
                  <MenuItem value={UserTypes.EMPRESARIO}>Empresário</MenuItem>
                  <MenuItem value={UserTypes.CADI}>CADI</MenuItem>
                  <MenuItem value={UserTypes.ALUNO}>Aluno</MenuItem>
                  <MenuItem value={UserTypes.PROFESSOR}>Professor</MenuItem>
                </Select>
              }
            />
          </Field>
          <ExtraFields />
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
          <Button variant="text" color="primary" style={{ marginTop: '1em' }}>
            Já tenho uma conta
          </Button>
        </AuthForm>
      </AuthCard>
    </PageContainer>
  );
}

export default Register;
