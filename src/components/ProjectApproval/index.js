import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { arrayToOptions } from '../../helpers/ReactSelectHelper';
import Field from '../Field';
import PopUp from '../PopUp';
import Step from '../../utils/Step';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

function ProjectApproval({ projectId }) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { state: { aproved: 'aproved', reason: '' } },
  });

  const [projectAproved, setProjectAproved] = useState({
    display: false,
    message: '',
    severity: '',
  });

  const stepOptions = arrayToOptions({
    array: Step,
    labelKey: 'action',
    valueKey: 'level',
  });

  const { getUserInfo } = useAuth();
  const { email } = JSON.parse(getUserInfo());

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const aproved = data.state.aproved === 'aproved';
    const {
      step,
      state: { reason },
    } = data;
    try {
      await api.post('/graphql', {
        query: `mutation {
          updateProject(_id: "${projectId}", state: { aproved: ${aproved}, reason: "${reason}" }, step: "${step.value}", cadiOwner: "${email}") {
            title
          }
        }`,
      });
      setProjectAproved({
        display: true,
        message: 'Operação efetuada com sucesso!',
        severity: 'success',
      });
    } catch (err) {
      setProjectAproved({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  };

  const onClosePopUp = () =>
    setProjectAproved((oldData) => {
      return { ...oldData, display: false };
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PopUp
        display={projectAproved.display}
        severity={projectAproved.severity}
        message={projectAproved.message}
        onClose={onClosePopUp}
      />
      <Field>
        <FormLabel required>Etapa</FormLabel>
        <Controller
          name="step"
          instanceId="step"
          control={control}
          rules={{ required: true }}
          as={Select}
          options={stepOptions}
          placeholder="Selecione a etapa"
        />
      </Field>
      <Field>
        <FormLabel component="legend">Situação</FormLabel>
        <Controller
          as={
            <RadioGroup aria-label="state aprove" row>
              <FormControlLabel
                value="aproved"
                control={<Radio />}
                label="Aprovado"
              />
              <FormControlLabel
                value="disaproved"
                control={<Radio />}
                label="Reprovado"
              />
            </RadioGroup>
          }
          name="state.aproved"
          control={control}
        />
      </Field>
      <Field>
        <InputLabel>Justificativa</InputLabel>
        <OutlinedInput
          name="state.reason"
          inputRef={register}
          required
          multiline
          fullWidth
        />
      </Field>
      <Field applyHugeDistance>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirmar
        </Button>
      </Field>
    </form>
  );
}

export default ProjectApproval;
