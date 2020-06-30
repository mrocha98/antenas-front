import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select';
import Field from '../Field';
import PopUp from '../PopUp';
import { arrayToOptions } from '../../helpers/ReactSelectHelper';
import { useAuth } from '../../contexts/auth';
import UserTypes from '../../utils/UserTypes';
import api from '../../services/api';

function MedalAttribution() {
  const [students, setStudents] = useState([]);
  const [medals, setMedals] = useState([]);
  const [medalAttributed, setMedalAttributed] = useState({
    display: false,
    message: '',
    severity: '',
  });

  const onClosePopUp = () =>
    setMedalAttributed((oldData) => {
      return { ...oldData, display: false };
    });

  const { getUserInfo } = useAuth();
  const { _id: teacherId } = JSON.parse(getUserInfo());

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    async function loadStudents() {
      const res = await api.post('/graphql', {
        query: `{
        users(type: ${UserTypes.ALUNO}) {
            _id
            name
          }
        }
      `,
      });
      const options = arrayToOptions({
        array: res.data.data.users,
        labelKey: 'name',
      });
      setStudents(options);
    }
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadMedals() {
      const res = await api.post('/graphql', {
        query: `{
          medals {
            _id,
            title
          }
        }
      `,
      });
      const options = arrayToOptions({
        array: res.data.data.medals,
        labelKey: 'title',
      });
      setMedals(options);
    }
    loadMedals();
  }, []);

  async function onSubmit(data, event) {
    event.preventDefault();

    const {
      medal: { value: _id },
      student: { value: student },
    } = data;

    try {
      const req = await api.post('/graphql', {
        query: `mutation {
          giveMedal(_id: "${_id}", teacher: "${teacherId}", student: "${student}") {
            title
          }
        }`,
      });
      const { title } = req.data.data.giveMedal;
      setMedalAttributed({
        display: true,
        message: `Medalha ${title} atribuida com sucesso!`,
        severity: 'success',
      });
    } catch (err) {
      setMedalAttributed({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PopUp
          display={medalAttributed.display}
          severity={medalAttributed.severity}
          message={medalAttributed.message}
          onClose={onClosePopUp}
        />
        <Field>
          <InputLabel>Aluno</InputLabel>
          <Controller
            name="student"
            control={control}
            as={
              <Select
                options={students}
                isClearable
                isSearchable
                placeholder="Selecionar aluno..."
              />
            }
            rules={{ required: true }}
          />
        </Field>
        <Field>
          <InputLabel>Medalha</InputLabel>
          <Controller
            name="medal"
            control={control}
            as={<Select options={medals} isClearable isSearchable />}
            rules={{ required: true }}
          />
        </Field>
        <Field>
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

export default MedalAttribution;
