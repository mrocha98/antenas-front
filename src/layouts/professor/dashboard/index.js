import React from 'react';
import { useAuth } from '../../../contexts/auth';

export default function Dashboard() {
  const { getUserInfo } = useAuth();
  const { name } = JSON.parse(getUserInfo());
  return (
    <div>
      <h1>Dashboard do Professor {name}</h1>
    </div>
  );
}
