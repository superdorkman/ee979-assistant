import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter } from './Finance.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';
import axios from 'axios';

const recordTypes = ['所有记录', '充值记录', '提现记录', '支付记录', '退款记录', '收款记录'];

export class Finace extends Component {

  state = {
    selectedRecord: '所有记录',
    page: 1,
    size: 15,
    filter: {
      created: '',
      type: ''
    },
    list: null,
    total: 0,
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
            this.setState({ list: data, total: page.count });
          }
        }
      ).catch(err => {});
  }

  handleClick = () => {
  }

  handleSelect = (option, index, ki) => {
    this.setState({ selectedRecord: option });
  }

  renderRows() {
    const { list,  } = this.state;
    if (!list) return;

    return list.map((item, idx) => {
      const { index, type, num, created, balance, status } = item;
      return (
        <tr key={idx}>
          <td>{index}</td>
          <td>{type}</td>
          <td>{num}</td>
          <td>{created}</td>
          <td>{balance}</td>
          <td>{status}</td>
        </tr>
      )
    });
  }

  render() {
    const { selectedRecord } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="yellow" onClick={this.handleClick}>提现管理</Button> 
          <Button theme="blue">资金明细</Button> 
        </Nav>
        <Content>
          <SectionHeader title="提现管理" />
          <Filter>
            <Select selected={selectedRecord} options={recordTypes} onSelect={this.handleSelect} />
          </Filter>

          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>类型</th>
                <th>金额</th>
                <th>时间</th>
                <th>余额</th>
                <th>状态</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
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
