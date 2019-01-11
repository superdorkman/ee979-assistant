import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toggleOrderDetail } from '../../../actions/app';
import { Container, Mask, Main, Head, Messages, TimeStamp, MsgWrap, Msg,  } from './Detail.styled';
import ChatWrap from '../../chat-wrap/ChatWrap';
import axios from 'axios';
import { getTimeStamp } from '../../../utils/helper';
import formatTime from '../../../utils/formatTime';
import { ChatIpt } from '../chat-ipt/ChatIpt';
import Avatar from '../../common/avatar/Avatar';

const { ipcRenderer } = window.require('electron');

class Detail extends Component {

  state = {
    avatarMe: '',
    avatarYou: '',
    imHistory: null,
    curMessages: null,
    messages: null,
    curTarget: '',
    otherTarget: '',
    counterpart: '',
    service: null,
    singleTarget: false,
    order: null,
    orderSN: '',
    targetSN: '',
    title: '',
    viewDetail: false,
  }

  componentWillMount() {
    this.props.orderSN && this.getDetail(this.props.orderSN);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderSN) {
      this.setState({ messages: [] });
      this.getDetail(nextProps.orderSN);
    }

    if (nextProps.message) {
      this.handleNewMsg(nextProps.message);
    }
  }

  handleNewMsg(message) {
    if (!message) return;
    const { orderSN: sn, targetSN, order } = this.state;
    const { body, created, from, orderSN, status } = JSON.parse(message);
    if (sn !== orderSN) return;
    let response = {
      ...body,
      incoming: true,
      created,
      sys: from === 'PLATFORM'
    }
    order.status = status;
    this.combineMsgs(response, targetSN === from, from === 'PLATFORM');
    this.setState({ order });
  }

  getDetail(orderSN) {
    axios.post('Orders/detail', { orderSN })
      .then(res => {
        const { data, error } = res.data;
        if (data) {
          console.log(data);
          const { imHistory, order, yourRole, service } = data;
          this.setState({
            imHistory,
            myRole: yourRole,
            order,
            service
          }, () => {
            this.setChatTarget();
          });
        } else if (error) {
          openSnack(error);
        }
      }).catch(err => {});
  }

  setChatTarget() {
    let { myRole, order, curTarget, counterpart, otherTarget, service } = this.state;
    let singleTarget = false;
    let avatarMe = order[`${myRole}Info`].avatar;;
    let avatarYou;
    let targetSN;
    let title;
    if (order.tradeType === '担保交易' || order.tradeType === 'ShipmentTrader') {
      curTarget = counterpart = myRole === 'buyer' ? 'seller' : 'buyer';
      otherTarget = 'service';
      let t = myRole === 'buyer' ? '卖家' : '买家';
      title = `与${t}聊天中`;
    } else {
      singleTarget = true;
      curTarget = 'service';
      title = '与客服聊天中';
    }
    avatarYou = curTarget === 'service' ? service.avatar : order[`${curTarget}Info`].avatar;
    targetSN = order[curTarget];
    this.setState({ avatarMe, avatarYou, curTarget, counterpart, otherTarget, singleTarget, targetSN, title }, () => this.recoverMsg());
    
  }

  recoverMsg() {
    const { imHistory, singleTarget, order, counterpart } = this.state;
    let curMessages = [];
    let messages = [];
    let created;
    
    if (singleTarget) {
      imHistory.forEach((history, idx) => {
        if (!created) {
          messages.push({ timeStamp: formatTime(history.created, 'full') });
        }
        messages.push(this.formatMsg(history));
        if (getTimeStamp(history.created) - getTimeStamp(created) > 60000 && idx !== imHistory.length - 1) {
          messages.push({ timeStamp: formatTime(history.created, 'full') });
        }
        created = history.created;
      });
      
      curMessages = [...messages];
    } else {
      let cpMsgs = this.getMultipleTargetMsg(imHistory.filter(history => {
        return history.from === order[counterpart] ||
          history.to === order[counterpart] ||
          history.from === 'PLATFORM'
      }));
      let csMsgs = this.getMultipleTargetMsg(imHistory.filter(history => {
        return history.from === order.service || history.to === order.service || history.from === 'PLATFORM'
      }));
      messages = {
        [counterpart]: cpMsgs,
        service: csMsgs
      };
      curMessages = [...cpMsgs];
    }

    this.setState({ curMessages, messages });
    this.scrollToBottom();

    // this.getButtons();
  }

  getMultipleTargetMsg(historys) {
    let messages = [];
    let created;
    historys.forEach((history, idx) => {
      if (!created) {
        messages.push({ timeStamp: formatTime(history.created, 'full') });
      }
      if (getTimeStamp(history.created) - getTimeStamp(created) > 60000 && idx !== 0) {
        messages.push({ timeStamp: formatTime(history.created, 'full') });
      }
      messages.push(this.formatMsg(history));
      created = history.created;
    });

    return messages;
  }

  formatMsg(msg) {
    const { myRole, order } = this.state;
    let isSelf = msg.from === order[myRole];
    const body = JSON.parse(msg.body);

    let _msg;

    try {
      _msg = decodeURI(body.msg);
    } catch (e) {
      _msg = body.msg;
    }

    if (msg.from === 'PLATFORM') {
      return {
        ...body,
        msg: _msg,
        created: msg.created,
        incoming: true,
        sys: true
      }
    } else if (isSelf) {
      return {
        ...body,
        msg: _msg,
        created: msg.created,
      }
    } else {
      return {
        ...body,
        msg: _msg,
        created: msg.created,
        incoming: true
      }
    }
  }

  // 发送
  handleSendingMsg = (msgWrap) => {
    this.combineMsgs(msgWrap);
  }
  
  combineMsgs(data, isCurrent = true, isPlatform = false) {
    const { counterpart, curTarget, messages, order: { tradeType }} = this.state;
    let created = new Date();
    let curMessages;
    let canAddTimeStamp = true;
    if (tradeType === '担保交易' || tradeType === 'ShipmentTrader') {
      if (isPlatform) {
        if (canAddTimeStamp) {
          messages[counterpart].push({ timeStamp: formatTime(created, 'full') });
          messages['service'].push({ timeStamp: formatTime(created, 'full') });
        }
        messages[counterpart].push(data);
        messages['service'].push(data);
        curMessages = [...messages[curTarget]];
      } else if (isCurrent) {
        if (canAddTimeStamp) {
          messages[curTarget].push({ timeStamp: formatTime(created, 'full') });
        }
        messages[curTarget].push(data);
        curMessages = [...messages[curTarget]];
      } else {
        // this.msgUnRead++;
        // let target = this.chatTargets.filter(ct => ct.role !== this.curTarget)[0].role;
        // if (canAddTimeStamp) {
        //   messages[target].push({ timeStamp: formatTime(created, 'full') });
        // }
        // messages[target].push(data);
      }
    } else {
      if (canAddTimeStamp) {
        messages.push({ timeStamp: formatTime(created, 'full') });
      }
      messages.push(data);
      curMessages = [...messages];
    }
    this.setState({ messages, curMessages });
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const height = this.msgEl.scrollHeight - this.msgEl.clientHeight;
      this.msgEl.scrollTop = height;
    }, 40);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderMsgs() {
    const { avatarMe, avatarYou, curMessages, curTarget, counterpart, myRole, service, order } = this.state;
    if (!curMessages) {
      // return <LoadingWrap><Loading /></LoadingWrap>;
      return;
    }

    return curMessages.map((msg, idx) => {

      if (msg.timeStamp) {
        return <TimeStamp key={idx}><div>{ msg.timeStamp }</div></TimeStamp>
      }

      let str = msg.msg;

      if (msg.sys) {
        str = str.replace(/\/assets\//g, 'https://www.ee979.com/assets/');
      }

      return (
        <MsgWrap key={idx} self={!msg.incoming} sys={msg.sys}>
          {msg.sys ? (
            <Fragment>
              <div className="role">系统消息</div>
              <div className="msg-content sys" dangerouslySetInnerHTML={{__html: str}}></div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="avatar-wrap">
                {msg.incoming ? (
                  <Avatar src={avatarYou} size={40} />
                ) : (
                  <Avatar src={avatarMe} size={40} />
                )}
              </div>
              <Msg>
                {msg.incoming ? (
                  <div className="role">
                    {curTarget === 'service' ? '客服：' + service.name : (counterpart === 'buyer' ? '买家：' + order.buyerInfo.nickName : '卖家：' +
                    order.sellerInfo.nickName )}
                  </div>
                ) : (
                  <div className="role">我：{order[`${myRole}Info`].nickName}</div>
                )}

                {msg.imgOnly ? (
                  <div className="msg-img" onClick={() => this.handleImgClick(msg)}
                    dangerouslySetInnerHTML={{__html: str}}></div>
                ) : (
                  <div className="msg-content" dangerouslySetInnerHTML={{__html: str}}></div>
                )}
              </Msg>
            </Fragment>
          )}
        </MsgWrap>
      )
    });
  }

  handleImgClick(item) {
    const { curMessages } = this.state;
    let images = curMessages.filter(img => img.imgOnly).map(item => item.src);
    const curIdx = images.indexOf(item.src);
    ipcRenderer.send('gallary:open', {images, curIdx});
  }

  render() {
    const { orderSN, showOd, toggleOrderDetail } = this.props;
    const { targetSN, title } = this.state;

    return (
      <Container show={showOd}>
        <Mask show={showOd} onClick={() => toggleOrderDetail({showOd: false})} />
        <Main show={showOd}>
          <Head>
            {title}
          </Head>
          <Messages ref={node => this.msgEl = node}>
            {this.renderMsgs()}
          </Messages>
          <ChatIpt orderSN={orderSN} targetSN={targetSN} onSending={this.handleSendingMsg} />
        </Main>
      </Container>
    )
  }

}

const mapStateToProps = state => ({
  message: state.app.message,
  orderSN: state.app.orderSN,
  showOd: state.app.showOd,
});

const mapDispatchToProps = dispatch => ({
  toggleOrderDetail: info => dispatch(toggleOrderDetail(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);