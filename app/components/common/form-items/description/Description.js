import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openToast } from '../../../../actions';
import { Wrapper, IptWrap } from './Description.styled';
import Label from '../label/Label';

export class Description extends Component {
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
    const { required } = this.props;

    return (
      <Wrapper>
        <Label text="商品描述" isMust={required} />
        <IptWrap>
          <input placeholder="描述一下您的商品情况吧" value={value} onChange={this.handleChange}/>
        </IptWrap>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openToast: (text) => dispatch(openToast(text))
})

export default connect(null, mapDispatchToProps)(Description);
