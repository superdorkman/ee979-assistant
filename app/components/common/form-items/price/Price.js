import React, { Component } from 'react';
import { Wrapper, IptWrap } from './Price.styled';
import Label from '../label/Label';

export class PriceComp extends Component {

  state = {
    value: this.props.value || ''
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
    const { ki, onChange } = this.props;
    onChange(ki, e.target.value);
  }

  render() {
    const { value } = this.state;
    const { hint, label, unit, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        <IptWrap>
          <input required={required} value={value} onChange={this.handleChange} placeholder="请输入商品单价"/>
          {unit && <span className="unit">{unit}</span>}
        </IptWrap>
      </Wrapper>
    )
  }
}

export default PriceComp;
