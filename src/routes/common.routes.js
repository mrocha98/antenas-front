import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from '../layouts/common/landing';
import Login from '../layouts/common/login';
import Register from '../layouts/common/register';

export default function CommonRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
}
