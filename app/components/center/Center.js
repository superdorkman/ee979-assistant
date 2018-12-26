import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setNotices, updateMyInfo } from '../../actions/app';
import { Container, Row1, Row2, Col1, Cross, Notice } from './Center.styled';
import axios from 'axios';
import SectionHeader from '../common/section-header/SectionHeader';
import formatTime from '../../utils/formatTime';

import Credit from './credit/Credit';
import Enter from './enter/Enter';
import GoldBalance from './gold-balance/GoldBalance';
import Info from './info/Info';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  state = {
    stock: null,
  }

  componentWillMount() {
    this.getInfo();
    this.getNotices();
    this.getStock(); 
  }

  getInfo() {
    axios.get('Members/myAllInfo')
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.props.updateMyInfo(data);
          }
        }
      ).catch(err => {})
  }

  getNotices() {
    if (this.props.notices) return;
    const body = { page: 1, size: 5, filter: { catId: 2 }};
    axios.post('News/list', body)
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.props.setNotices(data);
          }
        }
      ).catch(err => {})
  }

  getStock() {
    if (this.props.notices) return;
    const phone = localStorage.getItem('username');
    const body = { phone: Number(phone), time: new Date() };
    axios.post('http://101.37.35.234:3333/api/SelfAllots/dailyInfo', body)
      .then(
        res => {
          const { msg } = res.data;
          if (msg === 'success') {
            this.setState({ stock: res.data });
          }
        }
      ).catch(err => {})
  }

  renderNotices() {
    const { notices } = this.props;
    if (!notices) return;

    return notices.map((notice) => {
      const { newsSN, title, created } = notice;
      return (
        <li key={newsSN} onClick={() => this.handleNoticeClick(newsSN)}>
          <span className="one-liner" title={title}>{title}</span>
          <i>{formatTime(created, 'MM-DD')}</i>
        </li>
      )
    })
  }

  handleNoticeClick(newsSN) {
    const url = `https://www.ee979.com/service/news/${newsSN}`;
    ipcRenderer.send('shell:openExternal', url);
  }

  renderRows() {
    const { goldBlance } = this.state;
    if (!goldBlance) return;

    // return goldBlance.map((item))
  }

  render() {
    const { stock } = this.state;

    return (
      <Container>
        <Row1>
          <Info />

          <Notice>
            <SectionHeader title="平台公告" more="更多" />
            <ul>
              {this.renderNotices()}
            </ul>
          </Notice>
        </Row1>

        <Row2>
          <Col1>
            <Credit />
            <Enter />
          </Col1>
          <Cross>
            <GoldBalance stock={stock} />
          </Cross>
        </Row2>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  notices: state.app.notices,
})

const mapDispatchToProps = (dispatch) => ({
  setNotices: (data) => dispatch(setNotices(data)),
  updateMyInfo: (info) => dispatch(updateMyInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center)
