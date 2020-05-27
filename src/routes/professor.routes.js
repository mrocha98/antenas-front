import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/professor/dashboard';
import NotFound from '../components/NotFound';

export default function ProfessorRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/professor" exact component={Dashboard} />
        <Route path="/" exact render={() => <Redirect to="/professor" />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
