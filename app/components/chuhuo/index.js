import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Chuhuo from './Chuhuo';
import Trend from './trend/Trend';

class Chu extends Component {

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}`} component={Chuhuo} />
        <Route exact path={`${match.url}/trend`} component={Trend} />
      </Switch>
    );

  }
}

export default Chu;