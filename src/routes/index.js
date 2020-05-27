import React from 'react';
import CommonRoutes from './common.routes';
import AlunoRoutes from './aluno.routes';
import ProfessorRoutes from './professor.routes';
import CadiRoutes from './cadi.routes';
import EmpresarioRoutes from './empresario.routes';
import GlobalCircularProgress from '../components/GlobalCircularProgress';
import { useAuth } from '../contexts/auth';
import UserTypes from '../utils/UserTypes';

export default function Routes() {
  const { loading, signed, getUserInfo } = useAuth();

  if (loading) return <GlobalCircularProgress />;
  if (!signed) return <CommonRoutes />;

  const { type } = JSON.parse(getUserInfo());
  switch (type) {
    case UserTypes.ALUNO:
      return <AlunoRoutes />;
    case UserTypes.PROFESSOR:
      return <ProfessorRoutes />;
    case UserTypes.CADI:
      return <CadiRoutes />;
    case UserTypes.EMPRESARIO:
      return <EmpresarioRoutes />;
    default:
      return <CommonRoutes />;
  }
}
