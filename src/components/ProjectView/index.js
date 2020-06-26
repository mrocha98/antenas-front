import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import ProjectSelect from '../ProjectSelect';
import UserTypes from '../../utils/UserTypes';
import Steps from '../../utils/Steps';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import Field from '../Field';

export default function ProjectView() {
  const { register, reset } = useForm();
  const { getUserInfo } = useAuth();
  const { email: ownerEmail } = JSON.parse(getUserInfo());
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [stepMessage, setStepMessage] = useState('');

  useEffect(() => {
    async function loadData() {
      const req = await api.post('/graphql', {
        query: `{
      projectById(id: "${selectedProjectId}") {
        productOwner,
        linkOne,
        title
        quickDescription,
        step
      }
    }`,
      });
      const {
        projectById,
        projectById: { step: stepIndex },
      } = req.data.data;

      reset({ ...projectById });
      setStepMessage(Steps[stepIndex].status);
    }
    if (selectedProjectId) loadData();
  }, [selectedProjectId, reset]);

  return (
    <Container maxWidth="xs">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ProjectSelect
            ownerEmail={ownerEmail}
            ownerType={UserTypes.EMPRESARIO}
            handler={setSelectedProjectId}
          />
        </Grid>
        <Grid item xs={12}>
          <section style={{ textAlign: 'left' }}>
            {!selectedProjectId ? null : (
              <>
                <Field>
                  <Alert variant="outlined" severity="info">
                    <AlertTitle>Situação: </AlertTitle>
                    {stepMessage}
                  </Alert>
                </Field>
                <Field>
                  <InputLabel>Link</InputLabel>
                  <OutlinedInput
                    name="linkOne"
                    inputRef={register}
                    fullWidth
                    readOnly
                  />
                </Field>
                <Field>
                  <InputLabel>Breve descrição</InputLabel>
                  <OutlinedInput
                    name="quickDescription"
                    inputRef={register}
                    multiline
                    fullWidth
                    readOnly
                  />
                </Field>
                <Field>
                  <InputLabel>E-mail do P.O.</InputLabel>
                  <OutlinedInput
                    name="productOwner"
                    inputRef={register}
                    type="email"
                    fullWidth
                    readOnly
                  />
                </Field>
              </>
            )}
          </section>
        </Grid>
      </Grid>
    </Container>
  );
}
