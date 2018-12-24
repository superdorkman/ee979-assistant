import React from 'react';
import { Ellipse } from './Pagination.styled';

export default props => (
  <Ellipse width="30" height="30" onClick={props.onClick}>
    <rect x="4" y="13" width="4" height="4" fill="#666"/>
    <rect x="13" y="13" width="4" height="4" fill="#666"/>
    <rect x="22" y="13" width="4" height="4" fill="#666"/>
  </Ellipse>
)