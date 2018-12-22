import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 50px;
  min-height: 50px;
  background-color: #fff;
  -webkit-app-region: drag;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    font-size: 20px;
    color: #4e4e4e;
    -webkit-app-region: no-drag;
  }
`;

export const Ctrls = styled.ul`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  -webkit-app-region: no-drag;
  padding-bottom: 5px;

  li {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;

    svg {
      width: 100%;
      height: 100%;
    }

    &.expand {
      padding: 17px;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.close:hover {
      background-color: #fc581f;
    }
  }
`;

