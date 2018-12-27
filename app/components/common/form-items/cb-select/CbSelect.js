import React, { Component } from 'react';
import { Wrapper, Select, List, Item, CheckWrap } from './CbSelect.styled';
import Label from '../label/Label';
import Checkbox from '../../../libs/checkbox/Checkbox';

export class CbSelectComp extends Component {

  onCheck(option) {
    this.checked = true;
    let idx = this.checkList.indexOf(option);
    if (idx === -1) {
      this.checkList.push(option);
    } else {
      this.checkList.splice(idx, 1);
    }
    this.form.patchValue({delivery: this.checkList});
  }

  renderItems() {
    const { options } = this.props;
    if (!options) return;
    return options.map((option, idx) => (
      <Checkbox label={option} key={option} />
    ));
  }

  render() {
    const { isSelecting, option } = this.state;
    const { hint, hintm, isMust, label, options, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        
      </Wrapper>
    )
  }
}

export default CbSelectComp;
