import styled from 'styled-components';

// export const Wrapper = styled.div`
//   position: relative;
//   z-index: 99;

//   &:hover .pointer {
//     opacity: 1;
//     pointer-events: auto;
//     transform: translate(-50%, 0) scaleX(1);
//   }

//   .pointer {
//     position: absolute;
//     top: -10px;
//     left: 50%;
//     transform: translate(-50%, 10px) scaleX(0.9);
//     border: 6px solid;
//     border-color: rgba(0,0,0,.9) transparent transparent transparent;
//     opacity: 0;
//     pointer-events: none;
//     transition: .2s ease-out .1s;
//     transition-property: opacity, transform;
//   }

//   .inner {
//     position: absolute;
//     display: flex;
//     justify-content: center;
//     width: 300px;
//     max-width: 300px;
//     top: unset;
//     right: unset;
//     left: 50%;
//     bottom: calc(100% + 6px);
//     transform: translateX(-50%);

//     .text {
//       display: flex;
//       border-radius: 6px;
//       padding: 6px 10px;
//       background-color: rgba(0,0,0,.8);
//       box-shadow: 2px 2px 5px rgba(80,80,80,.1);
//       font-size: 14px;
//       color: #fff;
//       line-height: 22px;
//     }
//   }
// `;

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  z-index: 99;

  &:hover .pointer {
    opacity: 1;
    transition: opacity .2s;
  }

  .pointer {
    position: absolute;
    border: 6px solid;
    z-index: 99999;
    opacity: 0;
    pointer-events: none;

    &.bottom {
      top: 100%;
      border-color: transparent transparent rgba(0,0,0,.8) transparent;

      .inner {
        top: calc(100% + 6px);
        right: unset;
        left: 50%;
        bottom: unset;
        transform: translateX(-50%);

        .text {
          top: 100%;
        }
      }
    }

    &.top {
      bottom: 100%;
      border-color: rgba(0,0,0,.8) transparent transparent transparent;
      
      .inner {
        top: unset;
        right: unset;
        left: 50%;
        bottom: calc(100% + 6px);
        transform: translateX(-50%);

        .text {
          bottom: 0;
        }
      }
    }

    &.top, &.bottom {
      left: 50%;
      transform: translateX(-50%);

      .inner {
        justify-content: center;
        width: 200px;
        max-width: 200px;
      }
    }

    &.left, &.right {
      top: 50%;
      transform: translateY(-50%);

      .inner {
        align-items: center;
        min-width: 200px;
        height: 160px;
        max-height: 160px;

        .text {
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    &.right {
      left: 100%;
      border-color: transparent rgba(0,0,0,.8) transparent transparent;
      .inner {
        justify-content: flex-start;
        right: unset;
        bottom: unset;
        top: 50%;
        left: calc(100% + 6px);
        transform: translateY(-50%);
      }
    }

    &.left {
      right: 100%;
      border-color: transparent transparent transparent rgba(0,0,0,.8);
      .inner {
        justify-content: flex-end;
        left: unset;
        bottom: unset;
        top: 50%;
        right: calc(100% + 6px);
        transform: translateY(-50%);
      }
    }

    .inner {
      position: absolute;
      display: flex;

      .text {
        position: absolute;
        display: flex;
        border-radius: 6px;
        padding: 6px 10px;
        background-color: rgba(0,0,0,.8);
        box-shadow: 2px 2px 5px rgba(80,80,80,.1);
        font-size: 12px;
        color: #fff;
        line-height: 22px;
      }
    }

  }

`;
