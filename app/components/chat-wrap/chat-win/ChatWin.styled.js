import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  border-top: 1px solid #cacaca;
  border-bottom: 1px solid #cacaca;
  background-color: #f0f0f0;
  padding: 30px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  &::-webkit-scrollbar-track {
    // border-radius: 10px;
    background-color: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0,0,0,.2);

    &:hover {
      background-color: rgba(0,0,0,.4);
    }
  }
`;

const Item = styled.div`
  min-height: 46px;
  display: flex;
  margin-bottom: 20px;

  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    max-width: 40%;
    padding: 10px 20px;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
  }

  img {
    max-width: 400px;
    max-height: 150px;
    align-self: flex-start;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
  }
`;

export const LeftItem = styled(Item)`
  justify-content: flex-start;
  
  .content {
    background-color: #8868f1;
    border-radius: 25px 25px 25px 0;
  }

  .avatar {
    background-color: #8868f1;
    margin-right: 16px;
  }
`;

export const RightItem = styled(Item)`
  flex-direction: row-reverse;
  justify-content: flex-start;
  
  .content {
    background-color: #8f8f8f;
    border-radius: 25px 25px 0 25px;
  }

  .avatar {
    background-color: #8f8f8f;
    margin-left: 16px;
  }
`;

export const Timestamp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  color: #6c6c6c;
  margin-bottom: 10px;
  text-shadow: 1px 1px 1px #fff, 1.5px 1.5px 1.5px #fff;
`;