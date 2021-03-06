import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleOrderDetail } from '../../actions/app';
import { Container, List } from './Messages.styled';

class Messages extends Component {

  state = {
    msgs: [],
    show: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.processMsg(nextProps.message);
    }
  }

  processMsg(message) {
    try {
      const { body, from, orderSN, role } = JSON.parse(message);
      const { msgs } = this.state;
      const item = msgs.find(msg => msg.orderSN === orderSN);
      if (item) {
        item.count += 1;
        item.msg = body.msg;
        item.imgOnly = !!body.imgOnly;
      } else {
        msgs.unshift({
          orderSN,
          ...body,
          role,
          from,
          count: 1,
        });
      }
      this.setState({ msgs, show: true });
    } catch(e) {

    }
  }

  renderMsgs() {
    const { msgs } = this.state;
    return msgs.map((item, idx) => {
      const { imgOnly, msg, orderSN, role, count, from } = item;
      console.log(item)
      let _msg;

      if (from === 'PLATFORM') {
        _msg = '【系统消息】';
      } else if (imgOnly) {
        _msg = '【图片消息】';
      } else {
        _msg = msg;
      }

      return (
        <li key={idx} onClick={() => this.handleMsgClick(orderSN)}>
          <span className={`type ${role}`}>{role === 'seller' ? '卖' : '买'}</span>
          <div className="info">
            <p>订单 {orderSN}</p>
            <p className="one-liner">{ _msg }</p>
          </div>
          <i className="badge">{count}</i>
        </li>
      )
    });
  }

  dismissAll = () => {
    this.setState({ msgs: [], show: false });
  }

  handleMsgClick(orderSN) {
    this.dismissAll();
    this.props.toggleOrderDetail({showOd: true, orderSN});
  }

  render() {
    const { show } = this.state;

    return (
      <Container show={show}>
        <div className="head">新消息</div>
        <List>
          {this.renderMsgs()}
        </List>
        <div className="foot">
          <span onClick={this.dismissAll}>忽略全部</span>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.app.message,
});

const mapDispatchToProps = (dispatch) => ({
  toggleOrderDetail: (info) => dispatch(toggleOrderDetail(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);