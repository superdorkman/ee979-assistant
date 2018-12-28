import styled, { css } from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  .fake-radio {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    margin-right: 4px;
    position: relative;
  }

  input {
    position: absolute;
    visibility: hidden;

    &:checked + span {
      background-color: #fed15f;
      border-color: transparent;

      &:after {
        content: '\\2713';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        color: #fff;
      }
    }
  }
`;


