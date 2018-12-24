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
import Toolbar from '../components/toolbar/Toolbar';

import axios from 'axios';

import { API_URL } from '../constants/url';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((config) => {
  const session = JSON.parse(sessionStorage.getItem("session"));
  if (!session) return config;
  let { id } = session;
  if (!id || config.url.indexOf('access_token') > -1) return config;
  // console.log('config.url pre', config.url)
  if (config.url.indexOf('?') > -1) {
    if (config.url.indexOf('access_token') > -1) {
      config.url = config.url.replace(/access_token=(\w*)/g, '');
    }
    config.url = `${config.url}&access_token=${id}`;
  } else {
    config.url = `${config.url}?access_token=${id}`;
  }
  // console.log('config.url post', config.url)
  return config;
});

class Home extends Component {

  state = {
    title: '助手中心',
  }

  handleNav = (menu) => {
    this.setState({ title: menu.label });
  }

  render() {
    const { match } = this.props;
    const { title } = this.state;

    return (
      <Fragment>
        <Sidebar nav={this.handleNav} title={title} />
        <Container>
          <Toolbar title={title} />
          <Main> 
            <Switch>
              <Route exact path={`${match.url}`} component={Center} />
              <Route exact path={`${match.url}finance`} component={Finance} />
              <Route exact path={`${match.url}chuhuo`} component={Chuhuo} />
              <Route exact path={`${match.url}orders`} component={Orders} />
              <Route exact path={`${match.url}shouhuo`} component={Shouhuo} />
              <Route exact path={`${match.url}warehouse`} component={Warehouse} />
            </Switch>
          </Main>
        </Container>
      </Fragment>
    );

  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background-image: url(${bg});
  background-color: #fff;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: auto;
`;

export default Home;