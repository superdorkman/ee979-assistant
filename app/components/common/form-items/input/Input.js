import React, { Component } from 'react';
import { Wrapper, IptWrap } from './Input.styled';
import Label from '../label/Label';
import Check from '../../check/Check';

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
        <div>
          <Label text={label} isMust={required}/>
          <input type={type} required={required} value={value} onChange={this.handleChange} 
            />
          {unit && <span className="unit">{unit}</span>}
          <i className="hint">{ hint } </i>
          {/* <Check className="checker" /> */}
        </div>
      </Wrapper>
    
    )
  }
}

InputComp.defaultProps = {
  type: 'text'
}

export default InputComp;
