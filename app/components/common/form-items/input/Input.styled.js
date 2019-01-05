import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 20px;

  & > div {
    display: flex;
    align-items: center;
  }

  input {
    width: 150px;
    height: 30px;
    border: 1px solid #e4e2e5;
    padding: 0 20px;
    border-radius: 3px;
    font-size: 12px;
  }

  .hint {
    font-size: 12px;
    color: #999;
    margin-left: 20px;
  }

  .unit {
    font-size: 12px;
    color: #333;
    padding-left: 20px;
    display: flex;
    align-items: center;
  }

  .checker {
    margin-left: 8px;
    display: flex;
    align-items: center;
  }
  
`;
