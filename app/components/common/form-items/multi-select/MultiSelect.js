import React, { Component } from 'react';
import { Wrapper, Select, List, Item, CheckWrap } from './MultiSelect.styled';
import { Arrow } from '../../../common/icons';
import Label from '../label/Label';
import Popup from '../../../libs/popup/Popup';

import checkIcon from '../../../../assets/icons/check.svg';

export class MultiSelectComp extends Component {

  state = {
    isSelecting: false,
    option1: this.props.value1 || '',
    option2: this.props.value2 || '',
    options: this.props.options1,
    selecting: 1
  }

  handleItemClick(option) {
    const { key1, key2, onSelect, options2 } = this.props;
    const { selecting } = this.state;

    if (option === this.state[`option${selecting}`]) return this.dismiss();

    if (selecting === 1) {
      this.setState({ 
        selecting: 2,
        option1: option,
        options: options2[option],
      });
      onSelect(key1, option);
    } else if (selecting === 2) {
      this.setState({ 
        isSelecting: false,
        selecting: 1,
        option2: option 
      });
      onSelect(key2, option);
    }
  }

  handleSelect = () => {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  dismiss = () => {
    this.setState({ isSelecting: false });
  }

  renderItems() {
    const { options } = this.state;

    if (!options) return;
    return options.map((option, idx) => (
      <Item key={idx} onClick={() => this.handleItemClick(option)} active={option === this.state.option}>
        {option}
        {option === this.state.option && <CheckWrap><img src={checkIcon} /></CheckWrap>}
      </Item>
    ));
  }

  render() {
    const { isSelecting, option1, option2, options } = this.state;
    const { hint, hintm, isMust, label, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required}/>
        <Select onClick={this.handleSelect} solid={!!option1}>{option1 ? `${option1} - ${option2}` : (hintm || hint)} <Arrow direction='right' /></Select>

        <Popup show={isSelecting} dismiss={this.dismiss}>
          <List small={options && options.length < 8}>
            {this.renderItems()}
          </List>
        </Popup>
      </Wrapper>
    )
  }
}

export default MultiSelectComp;
