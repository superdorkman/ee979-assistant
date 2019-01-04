import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  -webkit-app-region: drag;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 126px;
  padding-top: 20px;
  background-image: linear-gradient(#8868f1, #6a4cce);

  img {
    width: 180px;
  }
`;

export const Ctrls = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  -webkit-app-region: no-drag;

  li {
    width: 28px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;

    svg {
      width: 100%;
      height: 100%;
      fill: #fff;
    }

    &:hover {
      background-color: #a892f0;
    }

    &.close:hover {
      background-color: #fc581f;
    }
  }
`;

export const Bottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

export const IptWrap = styled.div`
  position: relative;
  width: 235px;
  height: 48px;
  border-bottom: 1px solid #959595;
  -webkit-app-region: no-drag;
  display: flex;
  align-items: flex-end;

  .icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;

    svg {
      width: 18px;
      height: 18px;
      fill: #333;
    }
  }

  input {
    width: 100%;
    height: 30px;
    font-size: 16px;
    padding-left: 30px;

    &:focus + .line {
      transform: scaleX(1);
    }
  }

  .line {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #6f50d4;
    transform-origin: center;
    transform: scaleX(0);
    transition: transform 0.14s;
  }
`;

export const Submit = styled.button`
  width: 132px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  margin-top: 22px;
  background-image: linear-gradient(#8868f1, #6a4cce);
  border-radius: 20px 20px 20px 0;
  -webkit-app-region: no-drag;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;