import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/aluno/dashboard';
import Profile from '../layouts/aluno/profile';
import NotFound from '../components/NotFound';

export default function AlunoRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/aluno" exact component={Dashboard} />
        <Route path="/aluno/profile" component={Profile} />
        <Route path="/" exact render={() => <Redirect to="/aluno" />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
