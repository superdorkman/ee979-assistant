import React, { Component } from 'react';
import { Wrapper } from './Checkbox.styled';

export class Checkbox extends Component {

  handleChange = (e) => {
    // onChange(ki, e.target.value);
  }

  render() {
    const { label } = this.props;

    return (
      <Wrapper>
        <input type="checkbox" onChange={this.handleChange} /> 
        <span class="fake-radio"></span>
        <span>{ label }</span>
      </Wrapper>
    )
  }
}

export default Checkbox;
