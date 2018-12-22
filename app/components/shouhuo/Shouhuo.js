import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter } from './Shouhuo.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';
import axios from 'axios';

export class Shouhuo extends Component {

  state = {
    selectedArea: '',
    selectedServer: '',
    serverNames: [],
    selectedState: '',
  }

  componentWillMount() {
    this.getOnlineState();
  }

  getOnlineState() {
    axios.post('ElasticTraders/memStatus')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            // console.log(data);
            const { online } = data;
            this.setState({ selectedState: online ? '在线' : '离线'});
          }
        }
      ).catch(err => {});
  }

  handleSelect = (option, index, ki) => {
    switch (ki) {
      case 'areaName':
        return this.handleAreaname(option);
      case 'state':
        return this.changeState(option);
    }
  }

  handleAreaname(option) {
    const { serverList } = this.props;
    const serverNames = serverList.filter(v => v.areaName === option).map(v => v.serverName);
    this.setState({ selectedArea: option, serverNames });
  }

  changeState(option) {
    this.setState({ selectedState: option });
  }

  render() {
    const { areaNames } = this.props;
    const { selectedArea, selectedServer, serverNames, selectedState, } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="blue">收货配置</Button> 
          <Button theme="gray">收货商走势</Button> 
        </Nav>
        <Content>
          <SectionHeader title="收货配置" />
          <Filter>
            <Select selected={selectedArea} ki="areaName" label="游戏区" 
              options={areaNames} onSelect={this.handleSelect} />
            <Select selected={selectedServer} ki="serverName" label="游戏服" 
              options={serverNames}  onSelect={this.handleSelect}/>
            <Select selected={selectedState} ki="state" label="在线状态" 
              onSelect={this.handleSelect} options={['在线', '离线']} />
          </Filter>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  areaNames: state.game.areaNames,
  serverList: state.game.serverList,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Shouhuo);
