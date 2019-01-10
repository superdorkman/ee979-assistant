import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.checked ? '#ffc017' : '#ededee'};
  transition: background-color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  cursor: pointer;
`;

const Ball = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  transform: ${props => props.checked ? 'translateX(20px)' : 'translateX(0px)'};
  transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`;

export default class Switch extends Component {

  state = {
    checked: false
  }

  handleClick = () => {
    this.setState({checked: !this.state.checked});
    // this.props.onClick();
  }
  
  render() {
    const { checked } = this.state;

    return (
      <Wrapper onClick={this.handleClick} checked={checked}>
        <Ball checked={checked}/>
      </Wrapper>
    )
  }
  
}