import React from 'react';
import { useAuth } from '../../../contexts/auth';

export default function Dashboard() {
  const { getUserInfo } = useAuth();
  const { name } = JSON.parse(getUserInfo());
  return (
    <article className="page">
      <h1>Bem-vindo(a) {name}!</h1>
    </article>
  );
}
