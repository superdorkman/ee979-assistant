import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  color: #333;
  margin-right: 15px;

  em {
    color: #ff2d26;
    font-size: 12px;
    font-weight: bold;
    transform: scale(.8);
    opacity: 0;
    margin-right: 4px;

    &.must {
      opacity: 1;
    }
  }
`;