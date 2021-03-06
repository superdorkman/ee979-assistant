import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: ${props => props.isLocal ? 'absolute' : 'fixed'};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${props => props.light ? 'transparent' : 'rgba(0,0,0,.5)'};
  pointer-events: none;
  opacity: 0;

  ${props => props.show && css`
    opacity: 1;
    pointer-events: all;
  `};
`;