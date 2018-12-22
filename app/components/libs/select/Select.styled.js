import styled, { css } from "styled-components";

import ClickOutside from "../click-outside/ClickOutside";

export const Container = styled(ClickOutside)`
  cursor: pointer;
  position: relative;
  font-size: 12px;
  color: #999;

  &.hasErr {
    color: #e91528;

    .select-wrap {
      border-color: #e91528;
    }
  }

  .select-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-radius: 3px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border: 1px solid #ececec;
    cursor: pointer;
    user-select: none;
    outline: none;

    &.has-bg {
      background-color: #f7f7f7;
      border: none;
    }

    &:hover {
      background-color: #f7f7f7;
    }

    &.active {
      border-radius: 3px 3px 0 0;
    }

    &.selected {
      color: #333;
    }

    .arrow {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform .2s ease-out;

      svg {
        width: 14px;
      }
    }

    &.active .arrow {
      transform: rotate(180deg);
    }
  }

`;

export const Options = styled.ul`
  display: none;
  position: absolute;
  top: -50%;
  width: 100%;
  left: -8px;
  z-index: 999;
  margin: 0;
  padding: 0;
  background-color: #fff;
  max-height: 320px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #eee;
    transition: background-color 0.1s;

    &:hover {
      background-color: #cbcbcb;
    }
  }
`;

export const Option = styled.li`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  transition: all 0.15s ease-in;
  user-select: none;
  color: #333;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }

  &:last-child {
    border-radius: 0 0 3px 3px;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  ${props => props.active && css`
    background-color: rgba(0,0,0,.12) !important;
    border-bottom: none;

    ::before {
      content: '\\2713';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  `}
`;
