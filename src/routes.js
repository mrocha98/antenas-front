import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dummy from './pages/Dummy';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/dummy" component={Dummy} />
    </Switch>
  );
}
