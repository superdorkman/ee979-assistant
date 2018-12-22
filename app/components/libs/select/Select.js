import React, { Component } from "react";
import { Container, Options, Option } from "./Select.styled";

import ChevronDown from '../../common/icons/ChevronDown';

class Select extends Component {

  state = {
    isSelecting: false,
    selected: '',
  }

  toggleSelecting = () => {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  onOptionClick(option, idx) {
    this.setState({
      selected: option,
      isSelecting: false,
    })
  }

  handleClickOutside = () => {
    if (!this.state.isSelecting) return;
    this.setState({ isSelecting: false });
  }

  renderItems() {
    const { options } = this.props;
    const { selected } = this.state;
    return options.map((option, idx) => (
      <Option key={option} active={option === selected}
        onClick={() => this.onOptionClick(option, idx)}>
        {option}
      </Option>
    ));
  }

  render() {
    const { isSelecting } = this.state;
    const { disabled, width, height, options, errMsg, selected, label } = this.props;

    const style = {
      width,
      height
    };

    const ulStyle = {
      overflowY: options && options.length > 8 ? "scroll" : "visible",
      display: isSelecting ? "block" : "none"
    };

    return (
      <Container 
      onClickOutside={this.handleClickOutside} 
      style={style}>
        <div className={isSelecting ? 'select-wrap active' : 'select-wrap'} 
          onClick={this.toggleSelecting}>
          {selected || label }
          {!disabled && <div className="arrow"><ChevronDown /></div>}
        </div>

        <Options style={ulStyle}>
          {this.renderItems()}
        </Options>

      </Container>
    );
  }
}

Select.defaultProps = {
  disabled: false,
  options: [],
  width: 142,
  height: 40,
  label: "请选择"
};

export default Select;
