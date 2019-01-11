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

    // &.num {
    //   color: #ff8400;
    // }

    // &.balance {
    //   color: #007eff;
    // }

    &.pending { color: #ff8a00; }
    &.transfered { color: #999; }
    &.payed { color: #1e00ff; font-weight: bold; }

    &.status {
      color: #009c12;
    }

    button {
      width: 70px;
      height: 22px;
      font-size: 12px;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tbody tr:hover {
    background-color: #ececec;
  }
  
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  background-color: #fff;
  border-radius: 5px;
  padding: 0 30px;
  margin-bottom: 15px;

  .item {
    display: flex;
    align-items: center;
    margin-right: 30px;

    & > span {
      margin-right: 10px;
    }
  }

  input {
    width: 190px;
    height: 40px;
    border: 1px solid #ececec;
    border-radius: 3px;
    padding-left: 10px;
  }
`;

export const Content = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 30px;

  .head {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    h2 {
      margin-right: 30px;
    }
  }
`;
export const LoadWrap = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;