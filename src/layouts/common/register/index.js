import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Alert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import UserTypes from '../../../utils/UserTypes';
import AuthCard from '../../../components/AuthCard';
import AuthForm from '../../../components/AuthForm';
import Field from '../../../components/Field';
import { useAuth } from '../../../contexts/auth';
import { register as createUser } from '../../../services/auth';
import schema from './schema';

function Register() {
  const history = useHistory();
  const {
    handleSubmit,
    register,
    control,
    watch,
    errors,
    formState: { isSubmitting, isValid },
  } = useForm({
    validationSchema: schema,
    mode: 'onBlur',
  });
  const { signIn } = useAuth();
  const [registerError, setRegisterError] = useState({
    display: false,
    message: '',
  });
  const [showPassword, setShowPassword] = useState(true);
  const selectedType = watch('type');

  const handleShowPassword = () => setShowPassword(!showPassword);
  const choosePasswordIcon = () => (showPassword ? <FaEye /> : <FaEyeSlash />);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { name, email, password, type, position, company, cnpj } = data;
    try {
      const created = await createUser({
        name,
        email,
        password,
        type,
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
                  type={showPassword ? 'password' : 'text'}
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
                      <MenuItem value={UserTypes.EMPRESARIO}>
                        Empresário
                      </MenuItem>
                      <MenuItem value={UserTypes.CADI}>CADI</MenuItem>
                      <MenuItem value={UserTypes.ALUNO}>Aluno</MenuItem>
                      <MenuItem value={UserTypes.PROFESSOR}>Professor</MenuItem>
                    </Select>
                  }
                />
                <FormHelperText error>{errors.type?.message}</FormHelperText>
              </Field>
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
                {isSubmitting ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    color="primary"
                    disabled={!isValid}
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
