import React, { Component } from 'react'

export default class Check extends Component {
  render() {
    const {canCheck, valid, errMsg1, errMsg2, errMsg3} = this.props;
    const klass = valid ? 'valid' : 'invalid';
    if (canCheck) {
      klass += 'can-check';
    }
    
    return (
      <Container className="wrap">
        <svg viewBox="0 0 16 16">
          <path d="M12,6L7,11L5,9" className="success" />
          <path d="M11,11L5,5" className="err err1" />
          <path d="M5,11L11,5" className="err err2" />
        </svg>

        <span className={canCheck && 'can-check'}>{ errMsg1 || errMsg2 || errMsg3 }</span>
      </Container>
    )
  }
}
