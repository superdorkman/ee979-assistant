import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 13.13vw;
  background-color: #fff;
  margin-bottom: 1px;
`;

export const IptWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 18.75vw;
  padding: 0 4.6vw 0 2vw;
  font-size: 0.12rem;
  color: #999;

  input {
    flex: 1;
    height: 100%;
  }
`;