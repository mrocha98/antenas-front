import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const storagedUser = localStorage.getItem('@Antenas:user');
    const storagedToken = localStorage.getItem('@Antenas:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  async function signIn({ email, password }) {
    const response = await auth.signIn({ email, password });

    localStorage.setItem('@Antenas:user', JSON.stringify(response.user));
    localStorage.setItem('@Antenas:token', response.token);

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    setUser(response.user);
    history.push('/dashboard');
  }

  function signOut() {
    localStorage.removeItem('@Antenas:user');
    localStorage.removeItem('@Antenas:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
