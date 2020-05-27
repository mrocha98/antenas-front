import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/empresario/dashboard';
import NotFound from '../components/NotFound';

export default function EmpresarioRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/empresario" exact component={Dashboard} />
        <Route path="/" exact render={() => <Redirect to="/empresario" />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
