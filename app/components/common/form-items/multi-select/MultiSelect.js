import React, { Component } from 'react';
import { Wrapper } from './MultiSelect.styled';

import Label from '../label/Label';
import Select from '../../../libs/select/Select';

export class MultiSelectComp extends Component {

  state = {
    option1: this.props.value1 || '',
    option2: this.props.value2 || '',
    options2: [],
  }

  componentWillMount() {
    const {options2, value1} = this.props;
    if (value1) {
      this.setState({
        options2: options2[value1],
      })
    }
  }

  handleSelect = (option, index, ki) => {
    const { options2, onChange } = this.props;
    if (ki === 'areaName') {
      this.setState({
        option1: option,
        option2: '',
        options2: options2[option],
      });
    } else if (ki === 'serverName') {
      this.setState({
        option2: option,
      });
    }

    onChange(ki, option);
  }

  render() {
    const { option1, option2, options2 } = this.state;
    const { hint, label, key1, key2, required, options1 } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        <Select width={120} height={30} label="游戏区" ki={key1} selected={option1}
          onSelect={this.handleSelect} options={options1} />
        <Select width={120} height={30} label="游戏服" ki={key2} selected={option2}
          onSelect={this.handleSelect} options={options2} />
      </Wrapper>
    )
  }
}

export default MultiSelectComp;
