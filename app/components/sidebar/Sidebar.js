import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMyInfo } from '../../actions/app';
import { NavLink } from 'react-router-dom';

import { Container, Info, Menus, Logo } from './Sidebar.styled';
import Avatar from '../common/avatar/Avatar';
import HomeIcon from '../common/icons/Home';
import WarehouseIcon from '../common/icons/Warehouse';
import ShouhuoIcon from '../common/icons/Shouhuo';
import ChuhuoIcon from '../common/icons/Chuhuo';
import OrdersIcon from '../common/icons/Orders';
import FinanceIcon from '../common/icons/Finance';

import axios from 'axios';
import JifenStatus from '../common/jifen-status/JifenStatus';

const menus = [
  {path: '/', label: '助手中心'},
  {path: '/warehouse', label: '仓库管理'},
  {path: '/shouhuo', label: '我要收货'},
  {path: '/chuhuo', label: '我要出货'},
  {path: '/orders', label: '我的订单'},
  {path: '/finance', label: '财务管理'},
]

export class Sidebar extends Component {

  componentWillMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get('Members/myAllInfo')
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.props.updateMyInfo(data);
          }
        }
      ).catch(err => {})
  }

  checkIfActive({path}) {
    const url = location.hash.slice(1);
    return url === path;
  }

  onNav = (menu) => {
    if (this.props.title == menu.label) return;
    this.props.nav(menu);
  }

  getIcon(label) {
    switch (label) {
      case '助手中心':
        return <HomeIcon />;
      case '仓库管理':
        return <WarehouseIcon />;
      case '我要收货':
        return <ShouhuoIcon />;
      case '我要出货':
        return <ChuhuoIcon />;
      case '我的订单':
        return <OrdersIcon />;
      case '财务管理':
        return <FinanceIcon />;
      default: 
        return null;
    }
  }

  renderMenus() {
    return menus.map((menu, idx) => {
      const { path, label } = menu;
      return (
        <li key={idx} onClick={() => this.onNav(menu)}>
          <NavLink to={path} activeClassName="active" isActive={() => this.checkIfActive(menu)}>
            {this.getIcon(label)} &nbsp;&nbsp;
            {label}</NavLink>
        </li>
      )
    })
  }

  render() {
    const { avatar, nickName, username, jifen } = this.props.myAllInfo;

    return (
      <Container>
        <Info>
          <Avatar src={avatar} />
          <div className="name">{nickName || username}</div>
          <JifenStatus jifen={jifen} />
        </Info>

        <Menus>
          {this.renderMenus()}
        </Menus>

        <Logo>
        </Logo>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  myAllInfo: state.app.myAllInfo,
})

const mapDispatchToProps = (dispatch) => ({
  updateMyInfo: (info) => dispatch(updateMyInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
