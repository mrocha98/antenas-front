import React, { createContext, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../services/auth';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const userKey = '@Antenas:user';
  const tokenKey = '@Antenas:token';

  const getUserInfo = () => localStorage.getItem(userKey);
  const getTokenInfo = () => localStorage.getItem(tokenKey);

  useEffect(() => {
    const storagedUser = getUserInfo();
    const storagedToken = getTokenInfo();

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
    setLoading(false);
  }, []);

  async function signIn({ email, password }) {
    const response = await auth.signIn({ email, password });

    localStorage.setItem(userKey, JSON.stringify(response.user));
    localStorage.setItem(tokenKey, response.token);

    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    setUser(response.user);

    history.push('/');
  }

  function signOut() {
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        getUserInfo,
        getTokenInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
