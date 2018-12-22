import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

import Login from './components/login/Login';
import HomeStack from './containers/Home';
import PrivateRoute from './components/common/private/PrivateRoute';
import Gallary from './components/gallary/Gallary';

export default () => (
  // <App>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/gallary" component={Gallary} />
      <PrivateRoute path="/" component={HomeStack} />
    </Switch>
  // </App>
);
