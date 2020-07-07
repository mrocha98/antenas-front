import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/cadi/dashboard';
import Projects from '../layouts/cadi/projects';
import NotFound from '../components/NotFound';

export default function CadiRoutes() {
  const rootHash = 'cadi';
  const baseUrl = `/${rootHash}`;
  return (
    <>
      <Menu rootHash={rootHash} />
      <Switch>
        <Route path={baseUrl} exact component={Dashboard} />
        <Route path="/" exact render={() => <Redirect to={baseUrl} />} />
        <Route path={`${baseUrl}/projects`} component={Projects} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
