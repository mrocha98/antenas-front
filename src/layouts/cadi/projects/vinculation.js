import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Field from '../../../components/Field';
import PopUp from '../../../components/PopUp';
import { arrayToOptions } from '../../../helpers/ReactSelectHelper';
import api from '../../../services/api';
import UserTypes from '../../../utils/UserTypes';

function Vinculation() {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });
  const [projects, setProjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [vinculated, setVinculated] = useState({
    display: false,
    message: '',
    severity: '',
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { project, professor } = data;

    try {
      await api.post('/graphql', {
        query: `mutation {
          updateProject(_id: "${project.value}", teacherOwner: "${professor.value}") {
            _id
          }
        }`,
      });
      setVinculated({
        display: true,
        message: 'Vinculação efetuada com sucesso!',
        severity: 'success',
      });
    } catch (err) {
      setVinculated({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  };

  const onClosePopUp = () =>
    setVinculated((oldData) => {
      return { ...oldData, display: false };
    });

  useEffect(() => {
    async function loadProjects() {
      const req = await api.post('/graphql', {
        query: `{
          projects {
            _id
            title
            step
          }
        }`,
      });
      const { projects: loadedProjects } = req.data.data;
      const filteredProjects = loadedProjects.filter(
        (project) => project.step >= 4
      );
      const options = arrayToOptions({
        array: filteredProjects,
        labelKey: 'title',
      });
      setProjects(options);
    }
    loadProjects();
  }, []);

  useEffect(() => {
    async function loadProfessors() {
      const req = await api.post('/graphql', {
        query: `{
          users(type: ${UserTypes.PROFESSOR}) {
            name
            email
          }
        }`,
      });
      const { users } = req.data.data;
      const options = arrayToOptions({
        array: users,
        labelKey: 'name',
        valueKey: 'email',
      });
      setProfessors(options);
    }
    loadProfessors();
  }, []);

  return (
    <Container maxWidth="xl" disableGutters>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PopUp
          display={vinculated.display}
          severity={vinculated.severity}
          message={vinculated.message}
          onClose={onClosePopUp}
        />
        <Field>
          <InputLabel>Projeto</InputLabel>
          <Controller
            name="project"
            rules={{ required: true }}
            control={control}
            as={
              <Select
                options={projects}
                placeholder="Selecionar projeto"
                noOptionsMessage={() => 'Sem projetos...'}
              />
            }
          />
        </Field>
        <Field>
          <InputLabel>Professor</InputLabel>
          <Controller
            name="professor"
            rules={{ required: true }}
            control={control}
            as={
              <Select
                options={professors}
                placeholder="Selecionar professor"
                noOptionsMessage={() => 'Nenhum professor encontrado...'}
              />
            }
          />
        </Field>
        <Field applyHugeDistance>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
            fullWidth
          >
            Confirmar
          </Button>
        </Field>
      </form>
    </Container>
  );
}

export default Vinculation;
