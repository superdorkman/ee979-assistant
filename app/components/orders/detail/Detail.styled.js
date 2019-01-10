import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  top: 50px;
  left: 182px;
  pointer-events: none;

  ${props => props.show && css`
    pointer-events: all;
  `}
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: rgba(0,0,0,.4);
  transition: opacity .2s;

  ${props => props.show && css`
    opacity: 1;
  `}
`;

export const Chat = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  width: 600px;
  transform: translate3d(100%, 0, 0);
  transition: transform 0.2s;

  ${props => props.show && css`
    transform: translate3d(0, 0, 0);
  `}
`;