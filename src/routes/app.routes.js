import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from '../components/Menu';
import Home from '../pages/Home';
import Dummy from '../pages/Dummy';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/dashboard" component={Home} />
        <Route path="/dummy" component={Dummy} />
        <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}
