import React from 'react';
import { Wrapper } from './Label.styled';

const Label = props => {
  return (
    <Wrapper><em className={props.isMust ? 'must' : ''}>&#10029;</em>{props.text}：</Wrapper>
  )
}

export default Label;