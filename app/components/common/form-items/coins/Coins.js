import React, { Component } from 'react';
import { Wrapper, IptWrap } from './Coins.styled';
import Label from '../label/Label';

export class CoinsComp extends Component {

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
        <Label text="单件数量" isMust={required}/>
        <IptWrap>
          <input type="text" required={required} value={value} onChange={this.handleChange} placeholder="请输入出售的单件数量" />
          {unit && <span className="unit">{unit}</span>}
        </IptWrap>
      </Wrapper>
    )
  }
}

export default CoinsComp;
