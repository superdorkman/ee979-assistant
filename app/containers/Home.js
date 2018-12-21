import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/common/private/PrivateRoute';
import styled from 'styled-components';

import Sidebar from '../components/sidebar/Sidebar';
import Center from '../components/center/Center';
import Chuhuo from '../components/chuhuo/Chuhuo';
import Finance from '../components/finance/Finance';
import Shouhuo from '../components/shouhuo/Shouhuo';
import Orders from '../components/orders/Orders';
import Warehouse from '../components/warehouse/Warehouse';

import bg from '../assets/images/bg.png';

class Home extends Component {

  render() {
    const { match } = this.props;

    return (
      <Fragment>
        <Sidebar />
        <Container>
          <Switch>
            <Route exact path={`${match.url}/`} component={Center} />
            <Route exact path='/finance' component={Finance} />
            <Route exact path='/chuhuo' component={Chuhuo} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/shouhuo' component={Shouhuo} />
            <Route exact path='/warehouse' component={Warehouse} />
          </Switch>
        </Container>
      </Fragment>
    );

  }
}

const Container = styled.div`
  padding: 20px;
  flex: 1;
  background-image: url(${bg});
  background-color: #fff;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

export default Home;