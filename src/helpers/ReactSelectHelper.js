export const arrayToOptions = ({ array, labelKey, valueKey = '_id' }) =>
  array.map((option) => {
    return {
      label: option[`${labelKey}`],
      value: option[`${valueKey}`],
    };
  });
