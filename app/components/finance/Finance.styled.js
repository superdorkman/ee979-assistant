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

    &.num {
      color: #ff8400;
    }

    &.balance {
      color: #007eff;
    }

    &.status {
      color: #009c12;
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

export const LoadWrap = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  justify-content: space-between;
  padding: 10px 0;

  .left {
    display: flex;
    align-items: center;
  }
`;