import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

export default function AsyncSelect({
  handler,
  label,
  options,
  setOptions,
  fetchData,
  selectorName,
  valueName,
}) {
  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) return undefined;

    async function loadProjects() {
      if (active) {
        const req = await fetchData();
        const selector = req.data.data[`${selectorName}`];
        const formatedOptions = selector.reduce(
          (newArr, option) =>
            newArr.concat({
              name: option[`${valueName}`],
              value: option['_id'],
            }),
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
  }, [fetchData, loading, selectorName, setOptions, valueName]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open, setOptions]);

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
