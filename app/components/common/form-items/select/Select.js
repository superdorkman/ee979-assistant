import React, { Component } from 'react';
import { Wrapper, Select, List, Item, CheckWrap } from './Select.styled';
import { Arrow } from '../../../common/icons';
import Label from '../label/Label';
import Popup from '../../../libs/popup/Popup';
import svgIcons from '../../../../assets/icons/icons.svg';

import checkIcon from '../../../../assets/icons/check.svg';

export class SelectComp extends Component {

  state = {
    isSelecting: false,
    option: this.props.value || ''
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.option) {
      this.setState({ option: nextProps.value });
    }
  }

  handleItemClick(option) {
    const { ki, onSelect } = this.props;
    if (option === this.state.option) return this.dismiss();
    this.setState({ 
      isSelecting: false,
      option 
    });
    onSelect(ki, option);
  }

  handleSelect = () => {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  dismiss = () => {
    this.setState({ isSelecting: false });
  }

  renderItems() {
    const { options } = this.props;
    if (!options) return;
    return options.map((option, idx) => (
      <Item key={idx} onClick={() => this.handleItemClick(option)} active={option === this.state.option}>
        {option}
        {option === this.state.option && <CheckWrap><img src={checkIcon} /></CheckWrap>}
      </Item>
    ));
  }

  render() {
    const { isSelecting, option } = this.state;
    const { className, hint, hintm, isMust, label, options, required } = this.props;

    return (
      <Wrapper className={className}>
        <Label text={label} isMust={required}/>
        <Select onClick={this.handleSelect} solid={!!option}>{option ? option : (hintm || hint)} 
          {/* <Arrow direction='right' /> */}
          <svg className="arrow"><use xlinkHref={`${svgIcons}#arrow-right`}/></svg>
        </Select>

        <Popup show={isSelecting} dismiss={this.dismiss}>
          <List small={options && options.length < 8}>
            {this.renderItems()}
          </List>
        </Popup>
      </Wrapper>
    )
  }
}

export default SelectComp;
