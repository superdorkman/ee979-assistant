import styled, { css } from 'styled-components';
import ClickOutside from '../../libs/click-outside/ClickOutside';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 168px;
  height: 168px;
  background-color: #fff;
  box-shadow: 0 -2px 2px rgba(0,0,0,0.1);
`;

export const TopWidgets = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 6px 15px;

  .left, .right {
    display: flex;
  }

  .file {
    position: absolute;
    left: 10000px;
    opacity: 0;
  }

  .icon {
    width: 36px;
    height: 36px;
    padding: 8px;
    fill: #a2a2a2;
    margin-right: 8px;

    &:hover {
      background-color: #f0f0f0;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

export const EmojiHodler = styled(ClickOutside)`
  position: absolute;
  top: -272px;
  left: 8px;
  transform-origin: bottom left;
  transform: scale(0);
  opacity: 0;
  transition: transform .2s,opacity .2s,-webkit-transform .2s;
  z-index: 2;
  pointer-events: none;

  &.show {
    transform: scale(1);
    opacity: 1;
    pointer-events: all;
  }
    
`;

export const IptWrap = styled.div`
  position: relative;
  padding-bottom: 40px;
  flex: 1;
  display: flex;

  pre {
    flex: 1;
    outline: none;
    padding: 0 15px 6px;
    font-size: 14px;
    color: #333;
    line-height: 28px;
    white-space: pre-wrap;
    word-break: break-all;
  }
`;

export const SubmitBtn = styled.button`
  position: absolute;
  bottom: 10px;
  height: 30px;
  right: 25px;
  background-color: #f0f0f0;
  border: 1px solid #bfbfbf;
  padding: 0 10px;
  transition: all .2s;

  &:active {
    opacity: 0.7;
    background: #ccc;
  }
`;