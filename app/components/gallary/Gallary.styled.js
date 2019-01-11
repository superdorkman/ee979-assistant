import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  -webkit-app-region: drag;
  background-color: rgba(0,0,0,.8);
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  img {
    max-width: 80%;
  }
`;

export const CloseWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background-color: #fc581f;
  padding: 8px;
  justify-content: center;
  align-items: center;
  -webkit-app-region: no-drag;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  border: 1px solid #fff;
  width: 50px;
  height: 50px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  -webkit-app-region: no-drag;
  user-select: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Left = styled(Arrow)`
  left: 10px;
`;

export const Right = styled(Arrow)`
  right: 10px;
  transform: rotate(180deg);
`;

export const Widgets = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  width: 50px;
  -webkit-app-region: no-drag;
  cursor: pointer;

  & > div {
    width: 50px;
    height: 50px;
    padding: 8px;
  }
`;