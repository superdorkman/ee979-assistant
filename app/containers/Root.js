import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import type { Store } from '../reducers/types';
import Routes from '../Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/login/Login';
import HomeStack from '../containers/Home';
import PrivateRoute from '../components/common/private/PrivateRoute';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
