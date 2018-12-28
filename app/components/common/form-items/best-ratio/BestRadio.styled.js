import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-bottom: 20px;
    
  & > div {
    display: flex;
    align-items: center;
  }

  input {
    width: 150px;
    height: 30px;
    border: 1px solid #d9d9d9;
    padding: 0 20px;
    border-radius: 3px;
    font-size: 12px;
  }

  .hint {
    font-size: 12px;
    color: #7073ff;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
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
  
  .notice {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    background: linear-gradient(#7b7eff, #6266ff);
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    padding: 2px 20px;
    margin: 5px 0 0 115px;
    height: 26px;
  }  
`;
