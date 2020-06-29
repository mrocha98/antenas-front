import React from 'react';
import Page from '../Page';
import { useAuth } from '../../contexts/auth';
import './styles.scss';

export default function Dashboard({ children = null, artUrl }) {
  const { getUserInfo } = useAuth();
  const { name } = JSON.parse(getUserInfo());

  return (
    <Page title={`Bem-vindo(a), ${name}!`}>
      <section className="dashboard">
        {artUrl && (
          <img
            src={artUrl}
            alt="Dashboard Page Illustration"
            className="dashboard-art"
          />
        )}
        <div>{children}</div>
      </section>
    </Page>
  );
}
