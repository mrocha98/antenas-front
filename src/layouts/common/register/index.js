import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import UserTypes from '../../../utils/UserTypes';
import emailRegex from '../../../utils/emailRegex';
import AuthCard from '../../../components/AuthCard';
import AuthForm from '../../../components/AuthForm';
import Field from '../../../components/Field';
import { useAuth } from '../../../contexts/auth';
import { register as createUser } from '../../../services/auth';

function Register() {
  const typeOptions = [
    { label: 'Empresário', value: UserTypes.EMPRESARIO },
    { label: 'CADI', value: UserTypes.CADI },
    { label: 'Aluno', value: UserTypes.ALUNO },
    { label: 'Professor', value: UserTypes.PROFESSOR },
  ];

  const history = useHistory();
  const {
    handleSubmit,
    register,
    control,
    watch,
    errors,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange' });
  const { signIn } = useAuth();
  const [registerError, setRegisterError] = useState({
    display: false,
    message: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const selectedType = watch('type', 'value');

  const handleShowPassword = () => setShowPassword(!showPassword);
  const choosePasswordIcon = () => (showPassword ? <FaEye /> : <FaEyeSlash />);

  const onSubmit = async (data) => {
    const { name, email, password, type, position, company, cnpj } = data;
    const { value: selectedValue } = type;
    try {
      const created = await createUser({
        name,
        email,
        password,
        type: selectedValue,
        position,
        company,
        cnpj,
      });
      if (created) await signIn({ email, password });
    } catch (err) {
      setRegisterError({ display: true, message: err.response.data.error });
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
            <AuthForm
              title="Crie uma nova conta"
              onSubmit={handleSubmit(onSubmit)}
            >
              {registerError.display && (
                <Field>
                  <Alert severity="warning">{registerError.message}</Alert>
                </Field>
              )}
              <Field>
                <TextField
                  label="Nome"
                  name="name"
                  variant="outlined"
                  inputRef={register({ required: 'Nome é obrigatório' })}
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
                  inputRef={register({
                    required: 'E-Mail é obrigatório',
                    pattern: {
                      value: emailRegex,
                      message: 'Não esqueça do @ e do domínio',
                    },
                  })}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Field>
              <Field>
                <TextField
                  label="Senha"
                  name="password"
                  type={showPassword ? 'password' : 'text'}
                  variant="outlined"
                  inputRef={register({ required: 'Senha é obrigatória' })}
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
              <Field>
                <InputLabel error={!!errors.type}>Categoria</InputLabel>
                <Controller
                  name="type"
                  defaultValue={UserTypes.ALUNO}
                  control={control}
                  as={Select}
                  options={typeOptions}
                  rules={{
                    required: 'Escolha um tipo de usuário',
                    validate: ({ value }) =>
                      Object.values(UserTypes).includes(value) ||
                      'Categoria não selecionada ou inválida',
                  }}
                />
                <FormHelperText error>{errors.type?.message}</FormHelperText>
              </Field>
              {selectedType?.value === UserTypes.EMPRESARIO && (
                <>
                  <Field>
                    <TextField
                      name="company"
                      label="Nome da Empresa"
                      variant="outlined"
                      inputRef={register({
                        required: 'Nome da empresa é obrigatório',
                      })}
                      fullWidth
                      error={!!errors.company}
                      helperText={errors.company?.message}
                    />
                  </Field>
                  <Field>
                    <TextField
                      name="cnpj"
                      label="CNPJ"
                      variant="outlined"
                      inputRef={register({ required: 'CNPJ é obrigatório' })}
                      fullWidth
                      error={!!errors.cnpj}
                      helperText={errors.cnpj?.message}
                    />
                  </Field>
                </>
              )}
              <Field applyHugeDistance>
                {isSubmitting ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    color="primary"
                    fullWidth
                  >
                    Confirmar
                  </Button>
                )}
              </Field>
              <Divider variant="middle" />
              <Button
                variant="text"
                color="primary"
                style={{ marginTop: '1em' }}
                onClick={() => history.push('/login')}
              >
                Já tenho uma conta
              </Button>
            </AuthForm>
          </AuthCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
