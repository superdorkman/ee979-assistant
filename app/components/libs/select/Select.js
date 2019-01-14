import React, { Component } from "react";
import { Container, Options, Option } from "./Select.styled";

import ChevronDown from '../../common/icons/ChevronDown';

class Select extends Component {

  state = {
    isSelecting: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true)
  }

  handle = e => {
    const el = this.container;
    if (el && !el.contains(e.target)) {
      this.handleClickOutside();
    }
  }

  toggleSelecting = () => {
    this.setState({ isSelecting: !this.state.isSelecting });
  }

  onOptionClick(option, idx) {
    this.setState({
      isSelecting: false,
    });
    if (this.props.selected === option) return;
    this.props.onSelect(option, idx, this.props.ki);
  }

  handleClickOutside = () => {
    if (!this.state.isSelecting) return;
    this.setState({ isSelecting: false });
  }

  renderItems() {
    const { options, selected } = this.props;
    return options.map((option, idx) => (
      <Option key={option} active={option === selected}
        onClick={() => this.onOptionClick(option, idx)}>
        {option}
      </Option>
    ));
  }

  setPos() {
    let top = '-30%';
    let left = -8;
    let bottom = 'unset';
    if (!this.container) {
      return { top, left, bottom }
    }

    const { x, y } = this.container.getBoundingClientRect();
    const { width, height, options } = this.props;
    
    if (y + 10 * height > innerHeight) {
      top = 'unset';
      bottom = '-50%';
    } else if (y - 50 < (height / 2)) {
      top = '50%';
    }
    
    return { top, left, bottom }
  }

  render() {
    const { isSelecting } = this.state;
    const { disabled, width, height, options, errMsg, selected, label, style } = this.props;

    const containerStyle = {
      width,
      height,
      ...style
    };

    const pos = this.setPos();

    const ulStyle = {
      overflowY: options && options.length > 8 ? "scroll" : "visible",
      display: isSelecting ? "block" : "none",
      ...pos
    };

    let klass = 'select-wrap';
    if (isSelecting) {
      klass += ' active';
    } 

    if (selected) {
      klass += ' selected';
    }

    return (
      <Container style={containerStyle} ref={ref => this.container = ref}>
        <div className={klass} 
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
