import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #fed160;
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    
  
    path {
      fill: none;
      stroke-width: 1;
      stroke-dasharray: 100;
      stroke-dashoffset: -100;
  
      &.success {
        stroke: #966a12;
      }
  
      &.err {
        stroke: #fff;
      }
    
    }
  
    &.can-check {
      opacity: 1;
      transform: scale(1);
      transition: opacity .3s, transform .3s;
    
      &.valid {
    
        .success {
          stroke-dashoffset: 0;
          transition: all .7s ease-out .1s;
        }
      }
    
      &.invalid {
        background-color: #FF4040;
    
        .err {
          stroke-dashoffset: 0;
          transition: all .5s ease-out .1s;
        }
    
        .err2 {
          transition: all .5s ease-out .3s;
        }
    
      }
    }
    
  }
  
  span {
    font-size: 12px;
    display: inline-block;
    background: #FF4040;
    color: #fff;
    padding: 0 6px 0 18px;
    margin-left: -16px;
    line-height: 20px;
    border-radius: 10px;
    font-weight: bold;
    opacity: 0;
  
    &.can-check {
      opacity: 1;
      transition: opacity .3s;
    }
  }
  
`;
