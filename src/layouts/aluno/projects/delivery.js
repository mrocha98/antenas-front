import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Field from '../../../components/Field';
import PopUp from '../../../components/PopUp';
import { arrayToOptions } from '../../../helpers/ReactSelectHelper';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import UserTypes from '../../../utils/UserTypes';

function Delivery() {
  const {
    register,
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });
  const { getUserInfo } = useAuth();
  const { email } = JSON.parse(getUserInfo());
  const [submited, setSubmited] = useState({
    display: false,
    message: '',
    severity: '',
  });
  const [projects, setProjects] = useState([]);
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const req = await api.post('/graphql', {
        query: `{
          ProjectsByOwner(email: "${email}", type: ${UserTypes.ALUNO}) {
            _id
            title
            delivery
          }
        }`,
      });
      const { ProjectsByOwner } = req.data.data;
      setPreviousData(ProjectsByOwner.delivery);
      const options = arrayToOptions({
        array: ProjectsByOwner,
        labelKey: 'title',
      });
      setProjects(options);
    }
    loadProjects();
  }, [email]);

  const onClosePopUp = () =>
    setSubmited((oldData) => {
      return { ...oldData, display: false };
    });

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { project, delivery } = data;

    const deliveryArray = [`"${delivery}"`];

    if (previousData) {
      const parsedData = previousData.map((value) => `"${value}"`);
      deliveryArray.push(parsedData);
    }

    try {
      await api.post('/graphql', {
        query: `mutation {
          updateProject(_id: "${project.value}", delivery: [${deliveryArray}], step: "6") {
            _id
          }
        }`,
      });
      setSubmited({
        display: true,
        message: 'Entrega efetuada com sucesso!',
        severity: 'success',
      });
    } catch (err) {
      setSubmited({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PopUp
          display={submited.display}
          severity={submited.severity}
          message={submited.message}
          onClose={onClosePopUp}
        />
        <Field>
          <InputLabel>Projeto</InputLabel>
          <Controller
            name="project"
            control={control}
            rules={{ required: true }}
            as={
              <Select
                options={projects}
                placeholder="Selecione o projeto"
                noOptionsMessage={() => 'Nenhum projeto encontrado...'}
              />
            }
          />
        </Field>
        <Field>
          <InputLabel>Entrega</InputLabel>
          <OutlinedInput
            name="delivery"
            inputRef={register({ required: true })}
            fullWidth
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

export default Delivery;
