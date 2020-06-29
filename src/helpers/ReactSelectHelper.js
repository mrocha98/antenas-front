export const arrayToOptions = ({ array, labelKey, valueKey = '_id' }) =>
  array.reduce(
    (newArr, current) =>
      newArr.concat({
        label: current[`${labelKey}`],
        value: current[`${valueKey}`],
      }),
    []
  );
