import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import Home from '../pages/Home';
import Dummy from '../pages/Dummy';

export default function AppRoutes() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dummy" component={Dummy} />
      </Switch>
    </>
  );
}
