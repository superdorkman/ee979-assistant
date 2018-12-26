import styled from 'styled-components';

import ranks from '../../../assets/icons/ranks.png';

export const Container = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;

  li {
    width: 17px;
    height: 16px;
    background-image: url(${ranks});
    background-size: cover;
  
    &.star {
      background-position: 0 0;
    }
  
    // yellow-dimond 黄钻
    &.yd {
      background-position: -16.3px 0;
    }
  
    // blue-dimond 蓝钻
    &.bd {
      background-position: -33.3px 0;
    }
  
    // yellow-crown 皇冠
    &.yc {
      background-position: -50px 0;
    }
  
    // re'd-crown 红冠
    &.rc {
      background-position: -66.9px 0;
    }
  
    // 铜杯
    &.tb {
      background-position: -84px 0;
    }
  
    // 银杯
    &.ts {
      background-position: -102px 0;
    }
  
    // 金杯
    &.tg {
      background-position: -120px 0;
    }
  }
`;