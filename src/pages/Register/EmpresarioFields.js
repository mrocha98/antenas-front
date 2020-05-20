import React from 'react';
import TextField from '@material-ui/core/TextField';
import Field from '../../components/Field';

function EmpresarioFields({ register }) {
  return (
    <>
      <Field>
        <TextField
          required
          label="CPF"
          name="cpf"
          variant="outlined"
          inputRef={register}
          fullWidth
        />
      </Field>
      <Field>
        <TextField
          required
          label="Nome da Empresa"
          name="company"
          variant="outlined"
          inputRef={register}
          fullWidth
        />
      </Field>
    </>
  );
}

export default EmpresarioFields;
