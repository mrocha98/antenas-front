import React from 'react';
import TextField from '@material-ui/core/TextField';
import Field from '../../components/Field';

function CadiFields({ register }) {
  return (
    <Field>
      <TextField
        required
        label="Cargo"
        name="position"
        variant="outlined"
        inputRef={register}
        fullWidth
      />
    </Field>
  );
}

export default CadiFields;
