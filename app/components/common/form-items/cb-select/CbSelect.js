import React, { Component } from 'react';
import { Wrapper, Select, List, Item, CheckWrap } from './CbSelect.styled';
import Label from '../label/Label';
import Checkbox from '../../../libs/checkbox/Checkbox';

export class CbSelectComp extends Component {

  state = {
    checkList: [],
    checked: false,
  }

  onCheck(option) {
    const { checkList } = this.state;
    // this.checked = true;
    let idx = checkList.indexOf(option);
    if (idx === -1) {
      checkList.push(option);
    } else {
      checkList.splice(idx, 1);
    }
    console.log(this.props, checkList)
    this.props.onChange(this.props.ki, checkList);
  }

  renderItems() {
    const { options } = this.props;
    if (!options) return;
    return options.map((option, idx) => (
      <Checkbox check={() => this.onCheck(option)} label={option} key={option} 
        style={{marginRight: 10}} />
    ));
  }

  render() {
    const { hint, hintm, isMust, label, options, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        {this.renderItems()}
      </Wrapper>
    )
  }
}

export default CbSelectComp;
