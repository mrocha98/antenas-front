import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AuthRoutes() {
  return (
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  );
}
