import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex-direction: row-reverse;
`;

export const PageInfo = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 13px;
`;

export const PagerWrap = styled.div`
  display: flex;
  align-items: center;

  .jump_group {
    width: 90px;
    display: flex;
  }

  .jump_input {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    width: 40px;
    text-align: center;
    margin: 0 6px;
    height: 25px;
  }

  .jump_button {
    min-width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4px;
    border: 1px solid ${props => props.theme.main};
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    background-color: ${props => props.theme.main};
    font-size: 14px;
    margin-left: 10px;
  }
`;

export const Pager = styled.div`
  // width: 24px;
  min-width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  border: 1px solid ${props => props.active ? props.theme.main : '#ccc'};
  border-radius: 4px;
  color: ${props => props.active ? '#fff' : '#666'};
  font-size: 14px;
  margin-right: 10px;
  background-color: ${props => props.active ? props.theme.main : 'transparent'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? .5 : 1};

  svg {
    width: 100%;
    height: 100%;
  }

  &.left, &.right {
    width: 24px;
  }

  &.right {
    transform: rotate(180deg);
  }
`;

export const Ellipse = styled.svg`
  margin-right: 10px;
`;
