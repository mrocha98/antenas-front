/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import UserTypes from '../../utils/UserTypes';
import AuthCard from '../../components/AuthCard';
import AuthForm from '../../components/AuthForm';
import Field from '../../components/Field';
import { useAuth } from '../../contexts/auth';
import { register as createUser } from '../../services/auth';
import schema from './schema';

function Register() {
  const history = useHistory();
  const { handleSubmit, register, control, watch, errors } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });
  const { signIn } = useAuth();
  const [registerError, setRegisterError] = useState(false);
  const [selectedType, setSelectedType] = useState(UserTypes.ALUNO);
  const typeWatcher = watch('type');

  const onSubmit = async (data, event) => {
    event.preventDefault();
    data.isActive = true;
    try {
      const created = await createUser(data);
      if (created) await signIn(data.email, data.password);
    } catch (err) {
      console.log(err);
      setRegisterError(true);
    }
  };

  useEffect(() => {
    if (typeWatcher !== selectedType) setSelectedType(typeWatcher);
  }, [typeWatcher, selectedType]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" component="h1" align="center">
        Antenas
      </Typography>
      <AuthCard>
        <AuthForm title="Crie uma nova conta" onSubmit={handleSubmit(onSubmit)}>
          {registerError && (
            <Field>
              <Alert severity="warning">Esse e-mail já foi cadastrado</Alert>
            </Field>
          )}
          <Field>
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              inputRef={register}
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Field>
          <Field>
            <TextField
              label="E-mail"
              name="email"
              type="email"
              variant="outlined"
              inputRef={register}
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Field>
          <Field>
            <TextField
              label="Senha"
              name="password"
              type="password"
              variant="outlined"
              inputRef={register}
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Field>
          <Field>
            <InputLabel
              style={{ marginBottom: '0.5rem' }}
              error={!!errors.type}
            >
              Categoria
            </InputLabel>
            <Controller
              name="type"
              defaultValue=""
              control={control}
              as={
                <Select variant="outlined" fullWidth error={!!errors.type}>
                  <MenuItem value={UserTypes.EMPRESARIO}>Empresário</MenuItem>
                  <MenuItem value={UserTypes.CADI}>CADI</MenuItem>
                  <MenuItem value={UserTypes.ALUNO}>Aluno</MenuItem>
                  <MenuItem value={UserTypes.PROFESSOR}>Professor</MenuItem>
                </Select>
              }
            />
            <FormHelperText error>{errors.type?.message}</FormHelperText>
          </Field>
          {selectedType === UserTypes.CADI && (
            <Field>
              <Controller
                name="position"
                control={control}
                defaultValue=""
                as={
                  <TextField
                    label="Cargo"
                    variant="outlined"
                    fullWidth
                    error={!!errors.position}
                    helperText={errors.position?.message}
                  />
                }
              />
            </Field>
          )}
          {selectedType === UserTypes.EMPRESARIO && (
            <>
              <Field>
                <Controller
                  name="company"
                  control={control}
                  defaultValue=""
                  as={
                    <TextField
                      label="Nome da Empresa"
                      variant="outlined"
                      fullWidth
                      error={!!errors.company}
                      helperText={errors.company?.message}
                    />
                  }
                />
              </Field>
              <Field>
                <Controller
                  name="cnpj"
                  control={control}
                  defaultValue=""
                  as={
                    <TextField
                      label="CNPJ"
                      variant="outlined"
                      fullWidth
                      error={!!errors.cnpj}
                      helperText={errors.cnpj?.message}
                    />
                  }
                />
              </Field>
            </>
          )}
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
            color="secondary"
            style={{ marginTop: '1em' }}
            onClick={() => history.push('/login')}
          >
            Já tenho uma conta
          </Button>
        </AuthForm>
      </AuthCard>
    </Container>
  );
}

export default Register;
