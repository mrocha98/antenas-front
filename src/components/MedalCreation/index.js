import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Field from '../Field';
import schema from './schema';
import api from '../../services/api';

function MedalCreation() {
  const {
    handleSubmit,
    register,
    errors,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur', validationSchema: schema });

  const [createdMedal, setCreatedMedal] = useState({
    display: false,
    message: '',
    severity: '',
  });
  const hideTimeMs = 2500;

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { title, description, type } = data;

    try {
      const req = await api.post('/graphql', {
        query: `mutation {
              createMedal(
                title: "${title}",
                description: "${description}",
                type: "${type}",
              ) {
                  title
                }
              }
            `,
      });
      const { title: createdTitle } = req.data.data.createMedal;
      setCreatedMedal({
        display: true,
        message: `Medalha ${createdTitle} criada com sucesso!`,
        severity: 'success',
      });
      setTimeout(() => reset(), hideTimeMs);
    } catch (err) {
      setCreatedMedal({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Snackbar
          open={createdMedal.display}
          autoHideDuration={hideTimeMs}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() =>
            setCreatedMedal((oldData) => {
              return { ...oldData, display: false };
            })
          }
        >
          <Alert variant="outlined" severity={createdMedal.severity}>
            {createdMedal.message}
          </Alert>
        </Snackbar>
        <Field>
          <TextField
            name="title"
            inputRef={register}
            variant="outlined"
            label="Título"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </Field>
        <Field>
          <TextField
            name="type"
            inputRef={register}
            variant="outlined"
            label="Tipo"
            fullWidth
            error={!!errors.linkOne}
            helperText={errors.linkOne?.message}
          />
        </Field>
        <Field>
          <TextField
            name="description"
            inputRef={register}
            variant="outlined"
            label="Descrição"
            multiline
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Field>
        <Field applyHugeDistance>
          {isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
              size="large"
              fullWidth
            >
              Confirmar
            </Button>
          )}
        </Field>
      </form>
    </Container>
  );
}

export default MedalCreation;
