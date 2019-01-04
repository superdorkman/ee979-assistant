import React, { Component } from 'react';
import { Container } from './Button.styled';

const Button = ({ children, theme, ...props }) => {
  
  return (
    <Container className={theme} {...props}>
      {children}
    </Container>
  )
}

Button.defaultProps = {
  theme: 'gray',
}

export default Button;
