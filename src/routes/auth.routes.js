import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AuthRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={Login} />
    </Switch>
  );
}
