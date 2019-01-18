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
import initMqtt from '../../services/mqtt';

import Tooltip from '../libs/tooltip/Tooltip';
import { openSnack } from '../../services/SnackbarService';

const { ipcRenderer } = window.require('electron');

const menus = [
  {path: '/', label: '助手中心'},
  {path: '/warehouse', label: '仓库管理'},
  {path: '/shouhuo', label: '我要收货'},
  {path: '/chuhuo', label: '我要出货'},
  {path: '/orders', label: '我的订单'},
  {path: '/finance', label: '财务管理'},
]

export class Sidebar extends Component {

  componentDidMount() {
    ipcRenderer.on('online:toggle', (event, status) => {
      this.toggleOnline(status);
    });
    initMqtt();
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

  handleStatusClick = () => {
    const { online } = this.props.myAllInfo;
    const flag = confirm(`确定切换到${online ? '离线' : '在线'}状态吗?`);
    if (!flag) return;

    this.toggleOnline(!online);
  }

  toggleOnline(targetStatus) {
    
    const { myAllInfo, updateMyInfo } = this.props;
    const { online } = myAllInfo;
    if (targetStatus == online) return;

    axios.get('Members/toggleOnline')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            updateMyInfo({
              ...myAllInfo,
              online: targetStatus,
            });
            openSnack(`您已${online ? '离线' : '在线'}`);
          } else if (error) {
            openSnack(error);
          }
        }
      ).catch(err => {});
  }

  render() {
    const { avatar, nickName, username, jifen, online } = this.props.myAllInfo;

    return (
      <Container>
        <Info>
          <Avatar src={avatar} gray={!online} />
          <div className="name">{nickName || username}</div>
          <Tooltip pos="right" text={online ? '设置离线后除商城出货、收货外的普通商品将全部隐藏，用户无法进行购买！' : '您目前是离线状态，除商城出货、收货外的普通商品将全部隐藏，用户无法进行购买！'}>
            <div className={online ? 'status online' : 'status offline'} onClick={this.handleStatusClick}>
              <span className="indicator"></span>
              {online ? '在线' : '离线'}
            </div>
          </Tooltip>
          <JifenStatus jifen={jifen} />
        </Info>

        <Menus>
          {this.renderMenus()}
        </Menus>

        <Logo>
        </Logo>
        {/* <div className="update" title={this.state.updateMsg}>
          {this.state.updateMsg}
        </div> */}
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
