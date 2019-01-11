import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 270px;
  z-index: 999;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0,0,0,.4);
  user-select: none;
  border-radius: 6px;
  pointer-events: none;
  transform: translate3d(0, 200%, 0);
  opacity: 0;
  transition: all .2s;

  .head {
    display: flex;
    align-items: center;
    height: 30px;
    font-size： 16px;
    font-weight: bold;
    color: #333;
    padding: 0 20px;
  }

  .foot {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 36px;
    font-size： 15px;
    color: #009bdb;
    padding: 0 20px;
    border-top: 1px solid #ececec;
  }

  ${props => props.show && css`
    pointer-events: all;
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  li {
    position: relative;
    display: flex;
    align-items: center;
    height: 52px;
    padding: 0 20px;
    cursor: pointer;

    &:hover {
      background: #e6e9ed;
    }

    .type {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: red;
      color: #fff;
      margin-right: 10px;

      &.seller {
        background-image: linear-gradient(135deg, #11998e, #38ef7d);
      }

      &.buyer {
        background-image: linear-gradient(135deg, #E44D26, #F16529);
      }
    }

    .info {
      max-width: 70%;
      line-height: 18px;
    }

    .badge {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #f74c31;
      color: #fff;
      font-size: 10px;
    }
  }
`;