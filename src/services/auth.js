import api from './api';

export async function signIn({ email, password }) {
  const { data } = await api.post('/logon', { email, password });

  return {
    token: data.token,
    user: data.user,
  };
}

export async function register({ name, email, password, type, company, cnpj }) {
  const { data } = await api.post('/register', {
    name,
    email,
    password,
    type,
    company,
    cnpj,
    isActive: true,
    position: 1,
  });
  return data;
}
