import styled, { css, keyframes } from 'styled-components';

const progress = keyframes`
  0% {
    background-position: 40px 0;
  }
  100% {
    background-position: 0 0;
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  height: 240px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  padding: 20px;
  opacity: 0;
  pointer-events: none;

  ${props => props.show && css`
    opacity: 1;
    pointer-events: all;
  `}
`;

export const CloseWrap = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const Info = styled.div`
  align-self: stretch;

  h4 {
    margin-bottom: 10px;
    text-align: center;
    font-weight: normal;
  }

  .bar-wrap {
    height: 16px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .bar {
    width: 100%;
    height: 16px;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-image: linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);
    background-size: 40px 40px;
    background-color: #4530df;
    border-radius: 2px;
    animation: ${progress} 2s linear infinite;
  }
`;

export const Btns = styled.div`
  align-self: stretch;
  text-align: right;
  opacity: 0;
  pointer-events: none;

  ${props => props.done && css`
    opacity: 1;
    pointer-events: all;
  `}
  
  button {
    width: 120px;
    height: 30px;
    border-radius: 30px;
    background-image: linear-gradient(#7261f2, #4530df);
    color: #fff;
  }
`;