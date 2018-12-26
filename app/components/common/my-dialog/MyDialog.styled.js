import styled from 'styled-components';

export const Container = styled.div`
  

  h2 {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 0 20px 0 40px;
    color: #fff;
    font-size: 14px;
    background-image: linear-gradient(#7b7eff, #6266ff);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 70px;
      padding: 0 5px;
      font-weight: bold;
      background-color: #ff0060;

      // &:after {
      //   content: '';
      //   position: absolute;
      //   top: 100%;
      //   left: 0;
      //   border-width: 10px 35px 0 35px;
      //   border-style: solid;
      //   border-color: #ff0060 transparent transparent transparent;
      // }

      &:before {
        content: '';
        position: absolute;
        width: 8px;
        height: 1px;
        background-color: #fff;
        bottom: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .qufu {
      align-self: center;
    }
  }
`;