import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import GlobalCircularProgress from '../components/GlobalCircularProgress';
import { useAuth } from '../contexts/auth';

export default function Routes() {
  const { loading, signed } = useAuth();

  if (loading) return <GlobalCircularProgress />;
  return signed ? <AppRoutes /> : <AuthRoutes />;
}
