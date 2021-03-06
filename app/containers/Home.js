import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/common/private/PrivateRoute';
import styled from 'styled-components';

import Sidebar from '../components/sidebar/Sidebar';
import Center from '../components/center/Center';
import Chuhuo from '../components/chuhuo';
import Finance from '../components/finance';
import Shouhuo from '../components/shouhuo';
import Orders from '../components/orders/Orders';
import Warehouse from '../components/warehouse/Warehouse';

import bg from '../assets/images/bg.png';
import Toolbar from '../components/toolbar/Toolbar';

import axios from 'axios';

import { API_URL } from '../constants/url';
import Snackbar from '../components/libs/snackbar/Snackbar';
import OrderDetail from '../components/orders/detail/Detail';

import Messages from '../components/messages/Messages';
import Updater from '../components/common/updater/Updater';

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
              <Route path={`${match.url}finance`} component={Finance} />
              <Route path={`${match.url}chuhuo`} component={Chuhuo} />
              <Route exact path={`${match.url}orders`} component={Orders} />
              <Route path={`${match.url}shouhuo`} component={Shouhuo} />
              <Route exact path={`${match.url}warehouse`} component={Warehouse} />
            </Switch>
          </Main>
          <Snackbar />
          <OrderDetail />
          <Messages />

          <Updater />
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
  position: relative;
  flex: 1;
  padding: 15px;
  background-image: url(${bg});
  background-color: #fff;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #aaa;
    transition: background-color 0.1s;
  }
`;

export default Home;