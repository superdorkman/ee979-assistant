import React, { Component } from 'react';
import { Wrapper, IptWrap } from './Input.styled';
import Label from '../label/Label';

export class InputComp extends Component {

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
    const { hint, label, unit, required, type } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        <IptWrap>
          <input type={type || 'text'} required={required} value={value} onChange={this.handleChange} placeholder={hint} />
          {unit && <span className="unit">{unit}</span>}
        </IptWrap>
      </Wrapper>
    )
  }
}

export default InputComp;
