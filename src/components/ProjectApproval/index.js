/* eslint-disable react/jsx-boolean-value */
import React, { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import { arrayToOptions } from '../../helpers/ReactSelectHelper';
import Field from '../Field';
import PopUp from '../PopUp';
import Step from '../../utils/Step';
import api from '../../services/api';

function ProjectApproval({ projectId }) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { state: { aproved: 'aproved', reason: '' } },
  });

  const [projectAproved, setProjectAproved] = useState({
    display: false,
    message: '',
    severity: '',
  });

  const stepOptions = useMemo(() => {
    const cadiLevels = [1, 3, 4];
    const cadiOptions = Step.filter((step) => cadiLevels.includes(step.level));
    return arrayToOptions({
      array: cadiOptions,
      labelKey: 'action',
      valueKey: 'level',
    });
  }, []);

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
          updateProject(_id: "${projectId}", state: { aproved: ${aproved}, reason: "${reason}" }, step: "${step.value}") {
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
          control={control}
          rules={{ required: true }}
          as={<Select options={stepOptions} placeholder="Selecione a etapa" />}
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
        <TextField
          name="state.reason"
          inputRef={register}
          required
          label="Justificativa"
          variant="outlined"
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
