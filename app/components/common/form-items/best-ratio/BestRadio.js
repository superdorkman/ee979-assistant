import React, { Component } from 'react';
import { Container } from './BestRadio.styled';

import Label from '../label/Label';

class BestRadio extends Component {

  state = {
    value: '',
  }

  handleIptChange = (e) => {
    this.setState({ value: e.target.value });
  }

  getBest = () => {

  }

  render() {
    const { value } = this.state;
    const { label, required } = this.props;
    console.log(this.props)

    return (
      <Container>
        <div>
          <Label text={label} isMust={required} />
          <input required={required} autoComplete="off" maxLength="7" onChange={this.handleIptChange} />
          <b className="unit">万金/元</b>
          <i className="hint" onClick={this.getBest}>一键排第一</i>
        </div>
        <div className="notice">
          { (1 / value).toFixed(4) }元/万金
        </div>
      </Container>
    )
  }
}

export default BestRadio;