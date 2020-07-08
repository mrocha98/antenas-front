import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/empresario/dashboard';
import Projects from '../layouts/empresario/projects';
import NotFound from '../components/NotFound';

export default function EmpresarioRoutes() {
  const rootHash = 'empresario';
  const baseUrl = `/${rootHash}`;
  return (
    <>
      <Menu rootHash={rootHash} />
      <Switch>
        <Route path={baseUrl} exact component={Dashboard} />
        <Route path={`${baseUrl}/projects`} component={Projects} />
        <Route path="/" exact render={() => <Redirect to={baseUrl} />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
