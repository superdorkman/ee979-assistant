import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 13vw;
  background-color: #fff;
  margin-bottom: 1px;
`;

export const Select = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18.75vw;
  padding: 0 4.6vw 0 2vw;
  font-size: 0.12rem;
  transition: opacity .1s;
  color: #bdbcbc;
  font-size: .1rem;

  &:active {
    opacity: .4;
    background-color: rgba(0,0,0,.1);
  }

  ${props => props.solid && css`
    font-size: .12rem;
    color: #333;

    &:active {
      opacity: 1;
      background-color: inherit;
    }
  `}

  .arrow {
    width: 3vw;
    fill: #333;
  }
`;

export const Item = styled.li`
  position: relative;
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

  ${props => props.active && css`
    color: #ffcf4c;
  `}
`;

export const CheckWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 15vw;
  height: 15vw;
  padding: 4.5vw;
  
  img {
    width: 100%;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  ${props => props.small && css`

    ${Item} {
      width: 100%;
    }
  `}
`;

