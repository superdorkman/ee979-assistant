import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  max-width: 1500px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;

  table, table tr th, table tr td { border:1px solid #e2e2e2; }

  th {
    height: 45px;
    background-color: #f7f7f7;
  }

  td {
    height: 32px;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }
`;


export const Table = styled.table`
  
`;

export const LoadWrap = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Filter = styled.div`
  padding: 12px 0;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

export const Form = styled.div`
  width: 378px;
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

    em {
      color: red;
      font-size: 14px;
    }
  }

  .btn-group {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export const DateWrap = styled.div`
  position: relative;
  width: 142px;
  height: 40px;
  border: 1px solid #ececec;
  border-radius: 3px;
  cursor: pointer;
  // margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;

  .arrow {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .2s ease-out;

    svg {
      width: 14px;
    }
  }
`;

