import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter } from './Shouhuo.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';

export class Shouhuo extends Component {

  state = {
    selectedArea: ''
  }

  render() {
    const { areaNames } = this.props;
    const { selectedArea } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="blue">收货配置</Button> 
          <Button theme="gray">收货商走势</Button> 
        </Nav>
        <Content>
          <SectionHeader title="收货配置" />
          <Filter>
            <Select selected={selectedArea} label="游戏名" options={areaNames} />
          </Filter>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  areaNames: state.game.areaNames,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Shouhuo);
