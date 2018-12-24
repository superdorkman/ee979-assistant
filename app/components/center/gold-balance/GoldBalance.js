import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setNotices, updateMyInfo } from '../../actions/app';
import { Container, Row1, Row2, Col1, Cross, Info, Notice } from './GoldBalance.styled';
import axios from 'axios';
import SectionHeader from '../common/section-header/SectionHeader';
import formatTime from '../../utils/formatTime';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  componentWillMount() {
    this.getInfo();
    this.getNotices();
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

  render() {
    return (
      <Cross>
        <table>
          <thead>
            <tr>
              <th>跨区</th>
              <th>仓库剩余金币（万金）</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </Cross>
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
