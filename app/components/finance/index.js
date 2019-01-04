import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Finance from './Finance';

import Withdraw from './withdraw/Withdraw';

class Home extends Component {

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}`} component={Finance} />
        <Route exact path={`${match.url}/withdraw`} component={Withdraw} />
      </Switch>
    );

  }
}

export default Home;