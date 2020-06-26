import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Field from '../Field';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import schema from './schema';

const ProjectCreation = () => {
  const {
    handleSubmit,
    register,
    errors,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onBlur', validationSchema: schema });
  const { getUserInfo } = useAuth();
  const { email } = JSON.parse(getUserInfo());
  const [createdProject, setCreatedProject] = useState({
    display: false,
    message: '',
    severity: '',
  });
  const hideTimeMs = 2500;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const info = data;
    info.productOwner = email;
    info.step = 0;

    const { title, quickDescription, linkOne, productOwner, step } = info;

    try {
      const req = await api.post('/graphql', {
        query: `mutation {
            addProject(
              title: "${title}",
              quickDescription: "${quickDescription}",
              productOwner: "${productOwner}",
              linkOne: "${linkOne}",
              step: ${step}
            ) {
                title
              }
            }
          `,
      });
      const { title: createdTitle } = req.data.data.addProject;
      setCreatedProject({
        display: true,
        message: `Projeto ${createdTitle} criado com sucesso!`,
        severity: 'success',
      });
      setTimeout(() => reset(), hideTimeMs);
    } catch (err) {
      setCreatedProject({
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
          open={createdProject.display}
          autoHideDuration={hideTimeMs}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() =>
            setCreatedProject((oldData) => {
              return { ...oldData, display: false };
            })
          }
        >
          <Alert variant="outlined" severity={createdProject.severity}>
            {createdProject.message}
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
            name="quickDescription"
            inputRef={register}
            variant="outlined"
            label="Breve descrição"
            multiline
            fullWidth
            error={!!errors.quickDescription}
            helperText={errors.quickDescription?.message}
          />
        </Field>
        <Field>
          <TextField
            name="linkOne"
            inputRef={register}
            variant="outlined"
            label="Link"
            fullWidth
            error={!!errors.linkOne}
            helperText={errors.linkOne?.message}
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
};

export default ProjectCreation;
