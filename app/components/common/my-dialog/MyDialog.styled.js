import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 14px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 14px;
    color: #333;
    font-weight: 700;
  }

  .text {
    display: flex;
    font-size: 14px;
    padding-left: 13px;
    position: relative;
    color: #333;

    &.dark {
      font-weight: 700;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffba00;
      width: 4px;
      height: 100%;
      transform: scaleY(.7);
    }
  }

  .more {
    display: inline-flex;
    position: relative;
    color: #999999;
    font-size: 12px;
    cursor: pointer;
    padding-right: 10px;
    transition: opacity .1s;
    align-self: stretch;
    min-width: 40px;
    justify-content: center;
    align-items: center;

    &:active {
      opacity: .5;
    }

    &:after {
      content: "";
      position: absolute;
      transform: translateY(-50%) scaleY(.8);
      width: 5px;
      height: 10px;
      right: 0;
      top: 50%;
      background: url(/assets/images/ionic.png) -206px -20px;
      display: inline-block;
    }
  }
`;