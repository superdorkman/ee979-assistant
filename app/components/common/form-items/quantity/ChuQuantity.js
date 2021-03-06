import React, { Component } from 'react';
import { Wrapper, IptWrap, Select, List, Item, CheckWrap } from './ChuQuantity.styled';
import { Arrow } from '../../../common/icons';
import Label from '../label/Label';
import Popup from '../../../libs/popup/Popup';

import checkIcon from '../../../../assets/icons/check.svg';

export class ChuQuantityComp extends Component {

  state = {
    isSelecting: false,
    option: '按数量购买',
    options: ['按数量购买', '按元购买'],
    value: this.props.minNum * this.props.ratio || '',
    label: '购买数量',
    unit: this.props.unit,
  }

  componentWillMount() {
    const { ki, onChange, minNum, ratio } = this.props;
    this.setState({ value: minNum * ratio || '' });
    onChange(ki, minNum * ratio);
  }

  handleItemClick(option) {
    if (option === this.state.option) return this.dismiss();
    let {ki, onChange, unit, ratio, minNum} = this.props;
    let label, value;
    if (option === '按数量购买') {
      label = '购买数量';
      value = ratio * minNum;
    } else if (option === '按元购买') {
      unit = '元';
      label = '购买金额';
      value = minNum;
    }

    this.setState({ 
      isSelecting: false,
      option, label, unit, value
    });

    onChange(ki, value * ratio);
  }

  handleSelect = () => {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  handleChange = (e) => {
    const value = e.target.value;
    const { option } = this.state;
    const { ki, onChange, ratio } = this.props;
    this.setState({ value });
    
    let amount;
    if (option === '按数量购买') {
      amount = value;
    } else if (option === '按元购买') {
      amount = value * ratio;
    }
    onChange(ki, amount);
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
    const { isSelecting, label, option, options, value, unit } = this.state;
    const { hint, hintm, required } = this.props;

    return (
      <React.Fragment>
        <Wrapper>
          <Label text="购买方式" />
          <Select onClick={this.handleSelect} solid={!!option}>{option ? option : '请选择购买方式'} <Arrow direction='right' /></Select>

          <Popup show={isSelecting} dismiss={this.dismiss}>
            <List small={options && options.length < 8}>
              {this.renderItems()}
            </List>
          </Popup>
        </Wrapper>

        <Wrapper>
          <Label text={label} isMust={required}/>
          <IptWrap>
            <input required={required} value={value} onChange={this.handleChange} maxLength="7" />
            {unit && <span className="unit">{unit}</span>}
          </IptWrap>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ChuQuantityComp;
