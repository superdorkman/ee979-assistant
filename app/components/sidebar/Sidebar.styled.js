import styled from 'styled-components';

import infoBottom from '../../assets/images/info-bottom.png';

export const Container = styled.div`
  position: relative;
  width: 182px;
  min-width: 182px;
  height: 100%;
  background-color: #fff;
  -webkit-app-region: drag;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(#7261f2, #4530df);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;

  .name {
    color: #fff;
    margin: 10px 0;
  }
`;


export const Menus = styled.ul`
  -webkit-app-region: no-drag;
  // flex: 1;

  li {
    display: flex;
    height: 42px;

    a {
      display: flex;
      flex: 1;
      color: #fff;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      svg {
        fill: #fff;
      }

      &.active {
        background-color: #f7f5f6;
        color: #333;
        font-weight: bold;

        svg {
          fill: #000;
        }
      }
    }
    
  }
`;

export const Logo = styled.div`
  position: absolute;
  bottom: 50px;
  width: 111px;
  height: 39px;
  background-image: url(${infoBottom});
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
`;