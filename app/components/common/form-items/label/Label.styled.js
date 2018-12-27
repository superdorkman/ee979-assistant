import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 27vw;
  padding-left: 4.6vw;
  align-items: center;
  font-size: .12rem;
  color: #333;

  em {
    color: #ff2d26;
    font-size: 0.1rem;
    margin-right: 1vw;
    transform: scale(.8);
    opacity: 0;

    &.must {
      opacity: 1;
    }
  }
`;