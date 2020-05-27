import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/professor/dashboard';
import NotFound from '../components/NotFound';

export default function ProfessorRoutes() {
  const rootHash = 'professor';
  const baseUrl = `/${rootHash}`;
  return (
    <>
      <Menu rootHash={rootHash} />
      <Switch>
        <Route path={baseUrl} exact component={Dashboard} />
        <Route path="/" exact render={() => <Redirect to={baseUrl} />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
