import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Shouhuo from './Shouhuo';
import Trend from './trend/Trend';

class Shou extends Component {

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}`} component={Shouhuo} />
        <Route exact path={`${match.url}/trend`} component={Trend} />
      </Switch>
    );

  }
}

export default Shou;