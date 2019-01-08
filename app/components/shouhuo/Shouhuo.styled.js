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

    button {
      font-size: 12px;
      padding: 3px 6px;
      background: #e8e6e6;
      border-radius: 4px;
      margin-right: 5px;
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
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
  padding: 10px 0;
  border-bottom: 1px solid #ececec;

  .status {
    color: #999;
    font-size: 12px;
    margin-left: 10px;

    &.off {
      color: red;
    }
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

  .btns {
    margin: 20px 0 0 115px;

    button {
      margin-right: 30px;
    }
  }
`;