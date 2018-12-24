import React from 'react';
import { Container } from './Mask.styled';

export default function Mask(props) {
  const { onClick, isLocal, light } = props;

  return (
    <Container onClick={onClick} isLocal={isLocal} light={light}></Container>
  )
}
