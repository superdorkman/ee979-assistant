import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 298px;
  padding: 8px;
  background-color: #fff;
  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);

  opacity: 0;
  pointer-events: none;

  ${props => props.show && css`
    opacity: 1;
    pointer-events: all;
    transition: opacity .16s;
  `}
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #404040;

  & > div {
    display: flex;
  }
`;

export const NavButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .play {
    width: 12px;
  }

  .forward {
    width: 16px;
  }

  &:hover {
    background: #e0e0e0;
    border-radius: 4px;
  }

  ${props => props.reverse && css`
    transform: rotate(180deg);
  `}
  
`;

export const Weekdays = styled.ul`
  display: flex;
  border-bottom: 1px solid #c0c0c0;

  li {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
  }
`;

export const Days = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export const DayWrap = styled.li`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  cursor: pointer;

  ${props => props.disabled && css`
    color: #ccc;
    cursor: not-allowed;
  `}
`;

export const Day = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 50%;
  transition: all .1s;

  ${props => props.active && css`
    // background: #202020;
    background-color: ${props.theme.main};
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  `}

  &:hover {
    background: #ccc;
    color: #fff;
  }
`;