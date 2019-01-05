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
