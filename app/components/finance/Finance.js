import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter } from './Finance.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';

const recordTypes = ['所有记录', '充值记录', '提现记录', '支付记录', '退款记录', '收款记录'];

export class Finace extends Component {

  state = {
    selectedRecord: '所有记录',
  }

  handleClick = () => {
  }

  handleSelect = (option, index, ki) => {
    this.setState({ selectedRecord: option });
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
