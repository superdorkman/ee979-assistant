import React, { Component } from 'react';

import { Container, Ctrls } from './Toolbar.styled';
import Line from '../common/icons/Line';
import Expand from '../common/icons/Expand';
import Close from '../common/icons/Close';

const { ipcRenderer } = window.require('electron');

class Toolbar extends Component {

  handleCtrlClick(type) {
    ipcRenderer.send(`app:${type}`, {});
  }

  render() {
    const { title } = this.props;

    return (
      <Container>
        <span>{title}</span>
        <Ctrls>
          <li onClick={() => this.handleCtrlClick('extract')}>
            <Line />
          </li>
          <li className="expand" onClick={() => this.handleCtrlClick('expand')}>
            <Expand />  
          </li>
          <li className="close" onClick={() => this.handleCtrlClick('hide')}>
            <Close />  
          </li>
        </Ctrls>
      </Container>
    )
  }
}

export default Toolbar;
