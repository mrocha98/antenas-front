import api from './api';

export async function signIn(email, password) {
  const { data } = await api.post('/logon', { email, password });

  return {
    token: data.token,
    user: data.user,
  };
}

export async function register(info) {
  const { data } = await api.post('/register', info);
  return data;
}
