import styled from 'styled-components';

export const Container = styled.button`
  width: 110px;
  height: 30px;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    color: red;
  }
  

  &.yellow {
    background-image: linear-gradient(135deg, #ffd35d, #ffbc07);
    color: #6c4501;
  }

  &.blue {
    background-image: linear-gradient(#7f6eff, #533eed);
    color: #fff;
  }

  &.gray {
    background-color: #e2e2e2;
    color: #000;
  }
`;
