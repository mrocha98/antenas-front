import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/aluno/dashboard';
import Profile from '../layouts/aluno/profile';
import NotFound from '../components/NotFound';

export default function AlunoRoutes() {
  const rootHash = 'aluno';
  const baseUrl = `/${rootHash}`;
  return (
    <>
      <Menu rootHash={rootHash} />
      <Switch>
        <Route path={baseUrl} exact component={Dashboard} />
        <Route path={`${baseUrl}/profile`} component={Profile} />
        <Route path="/" exact render={() => <Redirect to={baseUrl} />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
