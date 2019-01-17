import React, { Component } from 'react';

import { Container, Info, Btns, CloseWrap } from "./Updater.styled";

import UpdateIcon from '../icons/update';
import CloseIcon from '../icons/close';

import { openSnack } from '../../../services/SnackbarService';

const { ipcRenderer } = window.require('electron'); 

class Updater extends Component {

  state = {
    showProgress: false,
    percentage: 0,
    show: false,
    message: '',
    done: false,
    checkCount: 0,
  }

  componentWillMount() {
    ipcRenderer.on('update', (event, text) => {
      // console.log(text);
      if (text === '有新版本') {
        this.setState({ show: true, message: '正在下载新版本', done: false, percentage: 0 });
      } else if (text === '更新出错') {
        this.setState({ message: '更新出错' });
      } else if (text === '已是最新版本') {
        if (this.state.checkCount > 0) {
          openSnack(text);
        } else {
          this.setState({ checkCount: this.state.checkCount + 1 });
        }
      } else if (text.indexOf('已下载') > -1) {
        const percentage = parseInt(text.split('已下载')[1]);
        this.setState({ percentage, message: text });
      } else if (text === '下载完成') {
        this.setState({ show: true, percentage: 100, message: '下载完成，可以关闭程序并更新', done: true });
      }
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  updateNow = () => {
    ipcRenderer.send('app:update', {});
  }

  render() {
    const { done, message, percentage, show } = this.state;

    const barStyle = {
      width: `${Math.floor(percentage)}%`,
    }

    return (
      <Container show={show}>
        <UpdateIcon />
        <CloseWrap onClick={this.handleClose}>
          <CloseIcon />
        </CloseWrap>
        <Info>
          <h4>{message}</h4>
          <div className="bar-wrap">
            <div className="bar" style={barStyle}></div>
          </div>
        </Info>
        <Btns done={done}>
          <button onClick={this.updateNow}>立即更新</button>
        </Btns>
      </Container>
    )
  }
}

export default Updater;