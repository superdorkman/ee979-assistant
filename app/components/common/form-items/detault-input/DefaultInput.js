import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, IptWrap } from './DefaultInput.styled';
import Label from '../label/Label';

export class DefaultInputComp extends Component {

  state = {
    value: this.props.value || ''
  }

  componentWillMount() {
    const { ki, onChange } = this.props;
    const value = this.props[ki];
    this.setState({ value });
    onChange(ki, value);
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
        <Label text={label} isMust={required}/>
        <IptWrap>
          <input required={required} value={value} onChange={this.handleChange} />
          {unit && <span className="unit">{unit}</span>}
        </IptWrap>
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  phone: state.setting.session.phone,
  qq: state.setting.session.qq,
});

export default connect(mapStateToProps)(DefaultInputComp);
