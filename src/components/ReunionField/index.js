import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Field from '../Field';
import './styles.scss';

function ReunionField({ register, isEditable = true }) {
  return (
    <div className="reunion-field">
      <Field>
        <InputLabel className="reunion-field__label">Reunião</InputLabel>
        <div className="reunion-field__container">
          <Field>
            <InputLabel>Local</InputLabel>
            <OutlinedInput
              name="reunion.place"
              inputRef={register}
              fullWidth
              readOnly={!isEditable}
            />
          </Field>
          <Field>
            <InputLabel>Data e hora</InputLabel>
            <OutlinedInput
              type="datetime-local"
              name="reunion.possibleDate"
              inputRef={register}
              fullWidth
              readOnly={!isEditable}
            />
          </Field>
        </div>
      </Field>
    </div>
  );
}

export default ReunionField;
