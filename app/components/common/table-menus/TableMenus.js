import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from './TableMenus.styled';

export default props => {
  const { count, menus, curMenu, onMenuSelect } = props;
  
  return (
    <Container>
      {menus.map((item) => {
        const {text, type} = item;
        return (
          <li className={type == curMenu ? "type-item active" : "type-item"}
          key={type} onClick={() => type !== curMenu && onMenuSelect(type)}> {text} 
            {!!count && !!count[type] && <span class="badge">{ count[type] }</span>}
          </li>
        )
      })}
    </Container>
  )
}
