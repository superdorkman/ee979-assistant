import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, LoadWrap, Nav, Content, Filter } from './Finance.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';
import axios from 'axios';
import formatTime from '../../utils/formatTime';

import Pagination from '../libs/pagination/Pagination';
import Loading from '../libs/loading/Loading';
import DateRange from '../common/date-range/DateRange';

const recordTypes = ['所有记录', '充值记录', '提现记录', '支付记录', '退款记录', '收款记录'];

export class Finace extends Component {

  state = {
    selectedDate: '默认',
    selectedRecord: '所有记录',
    page: 1,
    size: 12,
    filter: {
      created: '',
      type: ''
    },
    list: null,
    count: 0,
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
    const { page, size, filter } = this.state;
    const body = { page, size, filter };
    axios.post('Funds/history', body)
      .then(
        res => {
          const { data, error, page } = res.data;
          if (data) {
            this.setState({ list: data, count: page.count });
          }
        }
      ).catch(err => {});
  }

  getType(type) {
    switch (type) {
      case 'recharge':
        return '充值记录';
      case 'withdraw':
        return '提现记录';
      case 'pay':
        return '支付记录';
      case 'refund':
        return '退款记录';
      case 'receipt':
        return '收款记录';
      default:  
        break;
    }
  }

  reverseType(type) {
    switch (type) {
      case '充值记录':
        return 'recharge';
      case '提现记录':
        return 'withdraw';
      case '支付记录':
        return 'pay';
      case '退款记录':
        return 'refund';
      case '收款记录':
        return 'receipt';
      default:  
        break;
    }
  }

  transformNum(type, num, status) {
    switch (type) {
      case 'recharge':
      case 'receipt':
      case 'refund':
        return `+ ${num}`;
      case 'withdraw':
        if (status === 'decline') {
          return `+ ${num}`;
        } else {
          return `- ${num}`;
        }
      case 'pay':
        return `- ${num}`;
    }
  }

  getStatus(status) {
    switch (status) {
      case 'created':
        return '处理中';
      case 'success':
      case 'transfered':
        return '成功';
      case 'decline':
        return '拒绝';
      default:  
        break;
    }
  }

  handleClick = () => {
    const { history, match: { url }} = this.props;
    history.push(`${url}/withdraw`);
  }

  handleSelect = (option, index, ki) => {
    this.setState({ 
      selectedDate: '默认',
      selectedRecord: option, page: 1, filter: {
      type: this.reverseType(option),
      created: '',
    }}, () => {
      this.getList();
    });
  }

  // 改变一页显示数目
  handleSizeChange = (size) => {
    this.setState({ size }, () => {
      this.getList();
    });
  }

  // 选择第几页
  handlePageSelect = (page) => {
    this.setState({ page }, () => {
      this.getList();
    });
  }

  renderRows() {
    const { list,  } = this.state;
    if (!list) return;

    return list.map((item, idx) => {
      const { index, type, num, created, balance, status } = item;
      return (
        <tr key={idx}>
          <td>{index}</td>
          <td>{this.getType(type)}</td>
          <td className="num">{this.transformNum(type, num, status)}</td>
          <td>{formatTime(created, 'full')}</td>
          <td className="balance">{balance}</td>
          <td className="status">{this.getStatus(status)}</td>
        </tr>
      )
    });
  }

  handleDateChange = (option, created) => {
    this.setState({
      selectedDate: option,
      filter: {
        type: this.state.filter.type,
        created
      },
      page: 1,
    }, () => {
      this.getList();
    });
  }

  handleReset = () => {
    if (!this.state.filter.type && !this.state.filter.created) {
      console.log('no need to reload');
      return;
    }

    this.setState({
      selectedDate: '默认',
      page: 1,
      filter: {
        created: '',
        type: '',
      }
    }, () => {
      this.getList();
    })
  }

  render() {
    const { selectedDate, selectedRecord, count, page, size, list } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="blue">资金明细</Button> 
          <Button theme="gray" onClick={this.handleClick}>提现管理</Button> 
        </Nav>
        <Content>
          <SectionHeader title="提现管理" />
          <Filter>
            <div className="left">
              <Select selected={selectedRecord} options={recordTypes} onSelect={this.handleSelect} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <DateRange emitDate={this.handleDateChange} selectedDate={selectedDate} />
            </div>
            
            <Button theme="blue" onClick={this.handleReset}>重置</Button>  
          </Filter>

          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>类型</th>
                <th>金额（元）</th>
                <th>时间</th>
                <th>余额（元）</th>
                <th>状态</th>
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

          {!!list && !!count && (
            <Pagination count={count} page={page} size={size} 
              onSizeChange={this.handleSizeChange}
              onSelect={this.handlePageSelect} />
          )}
          
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Finace)
