import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
// import { Container } from './styles';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  );
}
