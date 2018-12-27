import styled from 'styled-components';

export const Container = styled.div`

  table, table tr th, table tr td { border:1px solid #e2e2e2; }

  th {
    height: 45px;
    background-color: #f7f7f7;
  }

  td {
    height: 32px;
    text-align: center;

    .on {
      color: #138900;
    }

    .pause {
      color: #ff1111;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }
  
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  border-radius: 5px;
  background-color: #fff;
  padding: 0 30px;
  margin-bottom: 15px;

  button {
    margin-right: 10px;
  }
`;

export const Content = styled.div`
  padding: 20px 30px;
  border-radius: 5px;
  background-color: #fff;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ececec;

  .status {
    color: #999;
    font-size: 12px;
    margin-left: 10px;
  }
`;

export const MenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btn {
    width: 88px;
    height: 26px;
  }
`;

export const Form = styled.div`
  width: 642px;
  background-color: #fff;
  padding: 30px;
  border-radius: 0 0 5px 5px;

  .ipt-wrap {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .label {
    width: 60px;
    text-align: right;
    color: #333;
    font-weight: bold;
    font-size: 14px;
  }

  input, textarea {
    border-radius: 3px;
    border: 1px solid #d5d5d5;
    background-color: #f7f7f7;
  }

  input {
    width: 152px;
    height: 32px;
    padding-left: 5px;
    margin-right: 6px;
  }

  textarea {
    width: 230px;
    height: 94px;
    resize: none;
    padding: 5px;
    outline: none;
  }

  .ratio {
    margin: 0 0 10px 60px;
  }

  .btn-group {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;