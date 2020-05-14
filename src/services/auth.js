import api from './api';

export async function signIn(email, password) {
  const { data } = await api.post('/logon', { email, password });

  if (data)
    return {
      token: data.token,
      user: data.user,
    };
  return Error('deu merda');
}

export async function register(name, email, password, type, isActive) {
  const { data } = await api.post('/register', {
    name,
    email,
    password,
    type,
    isActive,
  });

  if (data) return data;
  return Error('deu xabu');
}
