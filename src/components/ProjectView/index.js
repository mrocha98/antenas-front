import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import AsyncAutocomplete from '../AsyncAutocomplete';
import ProjectStatus from '../ProjectStatus';
import UserTypes from '../../utils/UserTypes';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
import Field from '../Field';

export default function ProjectView() {
  const { register, reset } = useForm();
  const { getUserInfo } = useAuth();
  const { email: ownerEmail } = JSON.parse(getUserInfo());
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  async function loadProjects() {
    return api.post('/graphql', {
      query: `query {
      ProjectsByOwner(email: "${ownerEmail}", type: ${UserTypes.EMPRESARIO}) {
          _id
          title
        }
      }
    `,
    });
  }

  useEffect(() => {
    async function loadData() {
      const req = await api.post('/graphql', {
        query: `{
      projectById(id: "${selectedProjectId}") {
        productOwner,
        linkOne,
        title
        quickDescription,
      }
    }`,
      });
      const { projectById } = req.data.data;
      reset({ ...projectById });
    }
    if (selectedProjectId) loadData();
  }, [selectedProjectId, reset]);

  return (
    <Container maxWidth="xs">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <AsyncAutocomplete
            fetchData={loadProjects}
            options={projects}
            setOptions={setProjects}
            label="Selecionar Projeto"
            selectorName="ProjectsByOwner"
            selectorValueName="title"
            handler={setSelectedProjectId}
          />
        </Grid>
        <Grid item xs={12}>
          <section style={{ textAlign: 'left' }}>
            {!selectedProjectId ? null : (
              <>
                <ProjectStatus projectId={selectedProjectId} />
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
