import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: 1px;
`;

export const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4vw 4.6vw;
`;

export const ImgWrap = styled.label`
  position: relative;
  width: 26vw;
  height: 26vw;
  border-radius: 2vw;
  border: 1px solid #ffcf4c;
  margin-bottom: 4vw;

  &:not(:nth-child(3n + 3)) {
    margin-right: 6vw;
  }

  input {
    position: absolute;
    opacity: 0;
    left: -1000vw;
  }

  &:after, &:before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffcf4c;
  }

  &:after {
    width: 6.25vw;
    height: 2px;
  }

  &:before {
    width: 2px;
    height: 6.25vw;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 2vw;
  }
`;

export const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #fff;
`;

export const CrossWrap = styled.div`
  position: absolute;
  z-index: 2;
  top: -3vw;
  right: -3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6vw;
  height: 6vw;
  background-color: #e04f5f;
  border-radius: 50%;
  overflow: hidden;
  padding: 1vw;
`;