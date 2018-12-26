import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setNotices, updateMyInfo } from '../../actions/app';
import { Container, Row1, Row2, Col1, Cross, Info, Notice } from './Center.styled';
import axios from 'axios';
import SectionHeader from '../common/section-header/SectionHeader';
import formatTime from '../../utils/formatTime';

import Credit from './credit/Credit';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  state = {
    goldBlance: null,
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
          const { data } = res.data;
          if (data) {
            // this.props.setNotices(data);
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
    return (
      <Container>
        <Row1>
          <Info>

          </Info>
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
          </Col1>
          <Cross>
            <table>
              <thead>
                <tr>
                  <th>跨区</th>
                  <th>仓库剩余金币（万金）</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
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
