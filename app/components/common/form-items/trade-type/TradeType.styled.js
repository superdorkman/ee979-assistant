import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  background: #fff;
  padding: 4vw 4.68vw;
  margin-top: 4.68vw;
  margin-bottom: 1px;

  & > h2 {
    font-size: 0.1rem;
    color: #333;
    margin-bottom: 4vw;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .deal {
    width: 43vw;
    height: 23.44vw;
    border: 1px solid #ffcf4c;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 2vw 3vw;
    position: relative;

    &.active {
      background-color: #ffcf4c;
      color: #333;

      b, p {
        color: #333;
      }
    }

    b {
      font-size: 0.09rem;
      color: #ffba00;
      position: absolute;
      top: 1.6vw;
      right: 2vw;
    }

    h2 {
      font-size: 0.13rem;
      color: #333;
      margin-bottom: 1vw;
    }

    p {
      font-size: 0.1rem;
      color: #999;
    }
  }
`;
