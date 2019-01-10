import React, { Component } from 'react'
import { Container, Mask, Chat } from './Detail.styled';

class Detail extends Component {
  render() {
    const { show, dismiss } = this.props;

    return (
      <Container show={show}>
        <Mask show={show} onClick={dismiss} />
        <Chat show={show}>

        </Chat>
      </Container>
    )
  }
}

export default Detail;