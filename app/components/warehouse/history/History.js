import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Table, Filter, Form, LoadWrap, DateWrap } from './History.styled';
import SectionHeader from '../../common/section-header/SectionHeader';
import axios from 'axios';
import Select from '../../libs/select/Select';

import Popover from '../../libs/popover/Popover';
import MyDialog from '../../common/my-dialog/MyDialog';
import MyButton from '../../libs/button/Button';
import Plus from '../../common/icons/Plus';
import Minus from '../../common/icons/Minus';
import ChevronDown from '../../common/icons/ChevronDown';
import Loading from '../../libs/loading/Loading';

import { toFixed } from '../../../utils/helper';
import formatTime from '../../../utils/formatTime';

import DatePicker from '../../libs/datepicker/DatePicker';

const types = ['全部类型', '出金', '收金'];
const crosses = ['全部跨区', '跨1', '跨2', '跨3a', '跨3b', '跨4', '跨5', '跨6', '跨7', '跨8'];
const theads = ['序号', '记录时间', '订单时间', '跨区', '订单编号', '数量', '件数', '价格', '比例', '类型', '剩余库存'];

export class History extends Component {

  state = {
    selecting: false,
    list: null,
    cross: '',
    typeIdx: 0,
    crossIdx: 0,
    tradeType: '',
    page: 1,
    size: 1000,
    date: '',
  }

  componentWillMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setState({ date: `${year}-${month}-${day}` }, () => {
      this.getHistory();
    })
  }

  getHistory() {
    const phone = localStorage.getItem('username');
    const { page, size, date, tradeType, cross } = this.state;
    axios.get(`http://101.37.35.234:3333/api/SelfAllots/history?page=${page}&size=${size}&date=${date}&tradeType=${tradeType}&phone=${phone}&cross=${cross ? `cross_${cross.slice(1)}` : ''}`)
      .then(
        res => {
          const { msg, data } = res.data;
          if (msg === 'success') {
            this.setState({ list: data });
          }
        }
      ).catch(err => {})
  }

  renderRows() {
    const { list } = this.state;

    return list.map((item, idx) => {
      const { buyNum, cnt, created, cross, orderCreated, orderSN, price, stock } = item;
      let _cross = cross.split('_')[1];
      return (
        <tr key={idx}>
          <td>{idx + 1}</td>
          <td>{formatTime(created, 'full')}</td>
          <td>{formatTime(orderCreated, 'full')}</td>
          <td>跨{_cross}</td>
          <td>{orderSN}</td>
          <td>{cnt}万金</td>
          <td>{buyNum || 1}件</td>
          <td>{price}元</td>
          <td>{toFixed(cnt/price)}</td>
          <td>入库</td>
          <td>{stock}万金</td>
        </tr>
      )
    })
  }

  renderTHeads() {
    return theads.map(head => (
      <th key={head}>{head}</th>
    ))
  }

  handleSelect = (option, index, ki) => {
    if (ki === 'cross') {
      this.setState({ [ki]: option, crossIdx: index }, () => {
        this.getHistory();
      });
    } else if (ki === 'tradeType') {
      this.setState({ [ki]: index > 0 ? option : '', typeIdx: index }, () => {
        this.getHistory();
      });
    }
  }

  toggleDatepicker = () => {
    this.setState({ selecting: !this.state.selecting });
  }

  handleDaySelect = (date) => {
    this.setState({ date }, () => {
      this.getHistory();
    })
  }

  render() {
    const { cross, list, typeIdx, crossIdx, selecting, date } = this.state;

    return (
      <Container>
       <Filter>
          <DateWrap onClick={this.toggleDatepicker}>
            {date || '选择日期'}
            <div className="arrow"><ChevronDown /></div>
            <DatePicker onDaySelect={this.handleDaySelect} date={date} show={selecting} />
          </DateWrap>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Select options={types} ki="tradeType"  label="全部类型" selected={types[typeIdx]}
            onSelect={this.handleSelect} />
            &nbsp;&nbsp;&nbsp;&nbsp;
          <Select options={crosses} ki="cross" label="全部跨区" selected={crosses[crossIdx]}
            onSelect={this.handleSelect} />
        </Filter>

        <table>
          <thead>
            <tr>
              {this.renderTHeads()}
            </tr>
          </thead>
          {!!list && (
            <tbody>
              {this.renderRows()}
            </tbody>
          )}
        </table>

        {!list && (
          <LoadWrap><Loading /></LoadWrap>
        )}

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  
})


export default connect(mapStateToProps)(History)
