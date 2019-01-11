import React, { PureComponent } from 'react';
import { Container, LeftItem, RightItem, Timestamp } from './ChatWin.styled';
import formatTime from '../../../utils/formatTime';

const { ipcRenderer } = window.require('electron');

export class ChatWin extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages) {
      this.created = '';
      setTimeout(() => {
        const { height } = this.win.getBoundingClientRect();
        this.win.scrollTop = this.win.scrollHeight - height;
      }, 100);
    }
  }

  handleMouseDown = (e) => {
    if (e.button !== 2) return;
  }

  transformMsgs() {
    const { messages, targetSn } = this.props;
    const formatedMsgs = [];
    messages.forEach(msg => {
      const body = typeof msg.body === 'string' ? JSON.parse(msg.body) : msg.body;

      if (this.shouldAddTimestamp(body.created)) {
        formatedMsgs.push({ timestamp: true, created: body.created });
      }
      formatedMsgs.push({ ...body, incomming: msg.from === targetSn });
    });

    return formatedMsgs;
  }

  shouldAddTimestamp(created) {
    if (!this.created) {
      this.created = created;
      return true;
    }

    if (new Date(created).getTime() - new Date(this.created).getTime() >= 60000) {
      this.created = created;
      return true;
    }

    return false;
  }

  createMarkup(html) {
    return { __html: html };
  }

  renderMsgs() {
    const messages = this.transformMsgs();

    return messages.map((item, idx) => {
      const { created, msg, incomming, imgOnly, src, timestamp } = item;
      const id = this.props.targetSn.length === 16 ? '用户' : '游客';
      if (timestamp) {
        return (
          <Timestamp key={created + idx}>{formatTime(created, 'full')}</Timestamp>
        )
      }

      if (incomming) {
        return (
          <LeftItem key={created + idx}>
            <div className="avatar">{id}</div>
            {imgOnly ? (
              <img src={src} />
            ) : (
              <div className="content" dangerouslySetInnerHTML={this.createMarkup(msg)}></div>
            )}
          </LeftItem>
        )
      }
      return (
        <RightItem key={created + idx}>
          <div className="avatar">易</div>
          {imgOnly ? (
            <img src={src} />
          ) : (
            <div className="content" dangerouslySetInnerHTML={this.createMarkup(msg)}></div>
          )}
        </RightItem>
      )
    });
  }

  render() {
    return (
      <Container onMouseDown={this.handleMouseDown} ref={node => this.win = node}>
        {this.renderMsgs()}
      </Container>
    )
  }
}

export default ChatWin;