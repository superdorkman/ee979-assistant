import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  max-width: 1500px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;

  .today-total {
    display: flex;
    align-items: center;
    margin: 20px 0;

    span {
      margin-right: 30px;
    }
  }

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
    // border-color: #e2e2e2;
    border-collapse: collapse;
    width: 100%;
  }
`;


export const Table = styled.table`
  
`;

export const Filter = styled.div`
  padding: 12px 0;
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  margin: 20px 0;
  display: flex;
  align-items: center;
`;