import React, { Component } from 'react';
import { Container } from './BestRadio.styled';

import Label from '../label/Label';
import { openSnack } from '../../../../services/SnackbarService';

class BestRadio extends Component {

  state = {
    value: this.props.value || '',
  }

  handleIptChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(this.props.ki, e.target.value);
  }

  getBest = () => {
    const { bValue } = this.props;
    if (!bValue) {
      return openSnack('此区暂无收货信息，无法为您提供最佳比例');
    }
    this.setState({ value: bValue });
    this.props.onChange(this.props.ki, bValue);
  }

  render() {
    let { value } = this.state;
    const { label, required } = this.props;

    value = String(value);

    return (
      <Container>
        <div>
          <Label text={label} isMust={required} />
          <input required={required} autoComplete="off" maxLength="7" 
            value={value}
            onChange={this.handleIptChange} />
          <b className="unit">万金/元</b>
          <i className="hint" onClick={this.getBest}>一键排第一</i>
        </div>
        <div className="notice">
          { (value ? 1 / value : 0).toFixed(4) }元/万金
        </div>
      </Container>
    )
  }
}

export default BestRadio;