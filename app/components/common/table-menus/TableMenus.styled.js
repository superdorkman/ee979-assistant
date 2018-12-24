import styled from 'styled-components';


export const Container = styled.ul`
  display: flex;
  margin: 30px 0 12px;

  .type-item {
    position: relative;
    font-size: 12px;
    color: #333333;
    height: 30px;
    margin-right: 40px;
    cursor: pointer;

    &.active {
      font-weight: bold;

      &:after {
        content: '';
        width: 50%;
        height: 3px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fcc549;
      }
    }

    .badge {
      min-width: 18px;
      height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #fff;
      background-color: #ff0001;
      border-radius: 6px;
      position: absolute;
      top: 3px;
      right: -23px;
    }
    
  }
`;