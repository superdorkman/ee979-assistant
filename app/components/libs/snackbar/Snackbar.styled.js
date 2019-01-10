import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 80px;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  max-width: 500px;
  min-height: 40px;
  padding: 0 20px;
  background-color: rgba(40,40,40,.9);
  opacity: 0;
  z-index: 9999;
  color: #fff;
  transform: translate3d(200%, 0, 0);
  border-radius: 4px;
  letter-spacing: 1.5px;
  transition: all .25s ease-out;

  ${props => props.show && css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `}
`;