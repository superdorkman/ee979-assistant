import React, { Component } from 'react';
import { Container } from './Checkbox.styled';

class Checkbox extends Component {

  handleChange = (e) => {
    // onChange(ki, e.target.value);
  }

  render() {
    const { label, ...props } = this.props;

    return (
      <Container {...props}>
        <input type="checkbox" onChange={this.handleChange} /> 
        <span className="fake-radio"></span>
        <span>{ label }</span>
      </Container>
    )
  }
}

export default Checkbox;
