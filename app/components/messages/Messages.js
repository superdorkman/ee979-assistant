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
      const { body, orderSN, role } = JSON.parse(message);
      const { msgs } = this.state;
      const item = msgs.find(msg => msg.orderSN === orderSN);
      if (item) {
        item.count += 1;
      } else {
        msgs.unshift({
          orderSN,
          msg: body.msg,
          role,
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
      const { msg, orderSN, role, count } = item;
      return (
        <li key={idx} onClick={() => this.handleMsgClick(orderSN)}>
          <span className={`type ${role}`}>{role === 'seller' ? '卖' : '买'}</span>
          <div className="info">
            <p>订单 {orderSN}</p>
            <p className="one-liner">{msg}</p>
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