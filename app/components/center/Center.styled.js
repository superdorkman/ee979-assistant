import styled from 'styled-components';

export const Container = styled.div`
  width: 980px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Row1 = styled(Row)`
  height: 216px;
  margin-bottom: 10px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 670px;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 10px;
`;

export const Notice = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  background-color: #fff;
  padding: 20px 30px;

  ul {
    flex: 1;
    font-size: 12px;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 10px;

    li {
      width: 100%;
      color: #666;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
  }
`;


export const Row2 = styled(Row)`
  height: 500px;
`;

export const Col1 = styled.div`
  width: 670px;
  min-width: 670px;
  margin-right: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Cross = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 3px;
  padding: 15px;

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
    height: 100%;
  }
`;