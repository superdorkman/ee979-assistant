import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  top: 51px;
  left: 182px;
  pointer-events: none;
  z-index: 11;

  ${props => props.show && css`
    pointer-events: all;
  `}
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: rgba(0,0,0,.4);
  transition: opacity .2s;

  ${props => props.show && css`
    opacity: 1;
  `}
`;

export const Main = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 600px;
  transform: translate3d(100%, 0, 0);
  transition: transform 0.2s;

  ${props => props.show && css`
    transform: translate3d(0, 0, 0);
  `}
`;

export const Messages = styled.div`
  position: relative;
  flex: 1;
  padding: 10px;
  overflow: auto;
`;

export const LoadingWrap = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // box-shadow: 0 2px 2px rgba(0,0,0,.1);
  border-bottom: 1px solid #ececec;
  font-size: 16px;
  padding: 0 30px;

  button {
    width: 100px;
    line-height: 30px;
    text-align: center;
    background-image: linear-gradient(#7b7eff,#6266ff);
    border-radius: 30px;
    color: #fff;
    font-weight: 700;
    font-size: 14px;

    &.service {
      background-image: linear-gradient(#ff8400, #ff9c33);
    }
  }
`;

export const Msg = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MsgWrap = styled.div`
  display: flex;
  margin-bottom: 10px;

  .msg-content {
    display: inline-flex;
    align-items: flex-start;
    align-self: flex-start;
    // margin: 10px 0 30px 0;
    background-color: #ddd;
    border-radius: 5px;
    padding: 10px;
    font-size: 12px;
    color: #000;
    position: relative;
    word-break: break-all;
    max-width: 60%;
  }

  .msg-img {
    max-width: 60%;
  }

  .avatar-wrap {
    margin: 0 10px 0 0;
  }

  .role {
    color: #7a7a7a;
    font-size: 12px;
    margin: 0 8px 4px;
  }

  ${props => props.sys && css`
    flex-direction: column;

    .msg-content {
      background-color: #e9e9f9;
    }
  `}

  ${props => props.self && css`
    flex-direction: row-reverse;

    ${Msg} {
      align-items: flex-end;
    }

    .msg-content {
      align-self: flex-end;
      color: #fff;
      background-image: linear-gradient(#7b7eff, #6266ff);

      &:after {
        border-color: transparent transparent transparent #7b7eff;
        left: 100%;
      }

    }

    .content-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .avatar-wrap {
      margin: 0 0 0 20px;
    }
  `}

  
`;

export const TimeStamp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  div {
    display: inline-flex;
    align-items: center;
    background-color: #d4d4d4;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    padding: 0 10px;
  }
`;