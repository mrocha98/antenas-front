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
import { useAuth } from '../../../contexts/auth';
import UserTypes from '../../../utils/UserTypes';

function Vinculation() {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const { getUserInfo } = useAuth();
  const { email } = JSON.parse(getUserInfo());

  const [vinculated, setVinculated] = useState({
    display: false,
    message: '',
    severity: '',
  });
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const req = await api.post('/graphql', {
        query: `{
          ProjectsByOwner(email: "${email}", type: ${UserTypes.PROFESSOR}) {
            _id
            title
          }
        }`,
      });
      const { ProjectsByOwner } = req.data.data;
      const options = arrayToOptions({
        array: ProjectsByOwner,
        labelKey: 'title',
      });
      setProjects(options);
    }
    loadProjects();
  }, [email]);

  useEffect(() => {
    async function loadStudents() {
      const req = await api.post('/graphql', {
        query: `{
          users(type: ${UserTypes.ALUNO}) {
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
      setStudents(options);
    }
    loadStudents();
  }, []);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { project } = data;
    const parsedStudents = data.students.map((student) => `"${student.value}"`);

    try {
      await api.post('/graphql', {
        query: `mutation {
          updateProject(_id: "${project.value}", students: [${parsedStudents}], step: "5") {
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

  return (
    <Container maxWidth="xl">
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
            instanceId="project"
            control={control}
            rules={{ required: true }}
            as={Select}
            options={projects}
            placeholder="Selecione o projeto"
            noOptionsMessage={() => 'Nenhum projeto encontrado...'}
          />
        </Field>
        <Field>
          <InputLabel>Alunos</InputLabel>
          <Controller
            name="students"
            instanceId="students"
            control={control}
            rules={{ required: true }}
            as={Select}
            options={students}
            placeholder="Selecione os alunos"
            noOptionsMessage={() => 'Nenhum aluno encontrado...'}
            isMulti
          />
        </Field>
        <Field applyHugeDistance>
          <Button
            type="submit"
            color="primary"
            variant="contained"
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
