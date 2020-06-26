import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import api from '../../services/api';

export default function ProjectSelect({
  ownerEmail,
  ownerType,
  handler,
  label = 'Selecionar projeto',
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) return undefined;

    async function loadProjects() {
      if (active) {
        const req = await api.post('/graphql', {
          query: `query {
          ProjectsByOwner(email: "${ownerEmail}", type: ${ownerType}) {
              _id
              title
            }
          }
        `,
        });
        const { ProjectsByOwner: projects } = req.data.data;
        const formatedOptions = projects.reduce(
          (newArr, { _id, title }) =>
            newArr.concat({ name: title, value: _id }),
          []
        );
        const sortedOptions = formatedOptions.sort((actual, next) =>
          actual.name.localeCompare(next.name)
        );
        setOptions(sortedOptions);
      }
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, [loading, ownerEmail, ownerType]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => handler(value?.value)}
      options={options}
      loading={loading}
      loadingText="Carregando..."
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
