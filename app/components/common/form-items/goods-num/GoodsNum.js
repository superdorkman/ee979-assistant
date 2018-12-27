import React, { Component } from 'react';
import { Wrapper } from './GoodsNum.styled';
import Counter from '../../counter/Counter';

class GoodsNum extends Component {

  handleNumChange = (num) => {
    const { ki, onChange, } = this.props;
    onChange(ki, num);
  }

  render() {
    const { options } = this.props;
    const max = options[options.length - 1];

    return (
      <Wrapper>
        购买数量
        <Counter max={max} onNumChange={this.handleNumChange}/>
      </Wrapper>
    )
  }
}


export default GoodsNum;
