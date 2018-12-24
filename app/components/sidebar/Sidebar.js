import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Info, Menus, Logo } from './Sidebar.styled';
import Avatar from '../common/avatar/Avatar';

const menus = [
  {path: '/', label: '助手中心'},
  {path: '/warehouse', label: '仓库管理'},
  {path: '/shouhuo', label: '我要收货'},
  {path: '/chuhuo', label: '我要出货'},
  {path: '/orders', label: '我的订单'},
  {path: '/finance', label: '财务管理'},
]

export class Sidebar extends Component {

  checkIfActive({path}) {
    const url = location.hash.slice(1);
    return url === path;
  }

  onNav = (menu) => {
    if (this.props.title == menu.label) return;
    this.props.nav(menu);
  }

  renderMenus() {
    return menus.map((menu, idx) => {
      const { path, label } = menu;
      return (
        <li key={idx} onClick={() => this.onNav(menu)}>
          <NavLink to={path} activeClassName="active" isActive={() => this.checkIfActive(menu)}>{label}</NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <Container>
        <Info>
          <Avatar src={this.props.avatar} />
          <div className="name">吴云光</div>
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
  avatar: state.app.myAllInfo.avatar,
})

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
