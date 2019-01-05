import styled from 'styled-components';

import datepicker from '../../../assets/icons/datepicker.png';

export const Container = styled.div`
  display: flex;
  align-items: center;

  .label {
    margin-right: 10px;
  }

  // 日期时间
  .custome-date {
    position: relative;
    margin-left: 20px;
    display: flex;

    input {
      height: 30px;
      outline: none;
      border: 1px solid #ececec;
      padding-left: 20px;

      &:focus {
        box-shadow: 0 0 4px #ffba00;
      }
    }

    // span {
    //   margin: 0 10px;
    //   font-size: 12px;
    //   color: #333;
    // }
  }

  // 自定义日期
  .picker {
    position: relative;
    width: 150px;
    height: 40px;
    margin-right: 10px;
    border-radius: 5px;
    background-color: #f7f7f7;
    padding: 0 20px;
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
    border: 1px solid #dedede;

    &:after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 14px;
      height: 14px;
      background-image: url(${datepicker});
      top: 13px;
      right: 12px;
      pointer-events: none;
    }

  }

  .picker-wrap {
    position: absolute;
    background-color: #fff;
    z-index: 99;
    top: 38px;
  }

`;
