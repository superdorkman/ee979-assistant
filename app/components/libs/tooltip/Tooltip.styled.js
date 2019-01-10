import styled from 'styled-components';


export const Wrapper = styled.div`
  position: relative;
  z-index: 99;

  &:hover .pointer {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0) scaleX(1);
  }

  .pointer {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translate(-50%, 10px) scaleX(0.9);
    border: 6px solid;
    border-color: rgba(0,0,0,.9) transparent transparent transparent;
    opacity: 0;
    pointer-events: none;
    transition: .2s ease-out .1s;
    transition-property: opacity, transform;
  }

  .inner {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 300px;
    max-width: 300px;
    top: unset;
    right: unset;
    left: 50%;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);

    .text {
      display: flex;
      border-radius: 6px;
      padding: 6px 10px;
      background-color: rgba(0,0,0,.8);
      box-shadow: 2px 2px 5px rgba(80,80,80,.1);
      font-size: 14px;
      color: #fff;
      line-height: 22px;
    }
  }
`;
