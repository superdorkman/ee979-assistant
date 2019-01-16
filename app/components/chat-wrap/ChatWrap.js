import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ChatIpt from './chat-ipt/ChatIpt';
import ChatWin from './chat-win/ChatWin';
import axios from 'axios';
import { API_URL } from '../../constants/url';

class ChatWrap extends Component {

  state = {
    messages: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderSN && this.props.orderSN !== nextProps.orderSN) {
      this.setState({ messages: [] });
      this.getDetail(nextProps.orderSN);
    }

    if (nextProps.message) {
      this.handleNewMsg(nextProps);
    }
  }
  
  handleNewMsg({message, orderSN}) {
    const parsedMsg = JSON.parse(message);
    if (!orderSN || parsedMsg.from !== orderSN) return;
    let { messages } = this.state;
    messages.push(parsedMsg);

    this.setState({ messages });
  } 

  getDetail(orderSN) {
    const body = { orderSN };
    axios.post('Orders/detail', body)
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            // console.log(data);
            // this.setState({
            //   messages: data,
            // })
          }
        }
      ).catch(err => {});
  }

  onSending = (msg) => {
    let messages = [...this.state.messages, {body: msg}];
    this.setState({ messages });
  }

  render() {
    const { messages } = this.state;
    const { orderSN } = this.props;

    return (
      <div style={styles.container}>
        <ChatWin messages={messages} targetSn={orderSN} />
        { orderSN && <ChatIpt targetSn={orderSN} onSending={this.onSending}/> }
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex', 
    flexDirection: 'column', 
    flex: 1
  }
}

const mapStateToProps = (state) => ({
  message: state.app.message,
  orderSN: state.app.orderSN,
});

export default connect(mapStateToProps)(ChatWrap);