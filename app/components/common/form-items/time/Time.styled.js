import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 13.13vw;
  background-color: #fff;
  margin-bottom: 1px;
`;

export const SelectWrap = styled.div`
  flex: 1;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding-right: 10vw;
`;

export const Select = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ececec;
  border-radius: 1vw;
  width: 20vw;
  height: 66%;
  font-size: 0.1rem;
  color: #bdbcbc;

  ${props => props.solid && css`
    font-size: 0.12rem;
    color: #333;
  `}
`;

export const Divider = styled.div`
  width: 3.1vw;
  height: 1px;
  background: #bdbcbc;
  margin: 0 3vw;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Item = styled.li`
  width: 50%;
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ececec;
  font-size: .12rem;
  color: #333;

  &:nth-child(2n + 1) {
    border-right: 1px solid #ececec;
  }
`;

