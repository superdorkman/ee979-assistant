import styled from 'styled-components';

export const Container = styled.div`
  width: 980px;
  margin: 0 auto;
  // background-color: red;
  // display: flex;
  // flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Row1 = styled(Row)`
  height: 216px;
  
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 670px;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 20px;
`;

export const Notice = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
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
      // max-width: 180px;
      cursor: pointer;
    }
}
`;