import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../layouts/cadi/dashboard';
import NotFound from '../components/NotFound';

export default function CadiRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/cadi" exact component={Dashboard} />
        <Route path="/" exact render={() => <Redirect to="/cadi" />} />
        <Route path="*" render={() => <NotFound />} />
      </Switch>
    </>
  );
}
