export const rootKey = '@Antenas';

export const createKey = (value) => `${rootKey}/${value}`;

export const clearAllRegisters = () =>
  Object.keys(localStorage).forEach((key) => {
    if (key.includes(rootKey)) localStorage.removeItem(key);
  });
