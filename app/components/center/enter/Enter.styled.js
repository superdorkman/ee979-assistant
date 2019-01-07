import styled from 'styled-components';

export const Container = styled.div`
    flex: 1;
    background-color: #fff;
    border-radius: 3px;
    padding: 30px;
`;

export const List = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 30px;

    li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 200px;
        height: 108px;
        padding: 12px;
        border-radius: 5px;
        background-image: linear-gradient(#7b7eff,#6266ff);
        background-color: #7b7eff;
        color: #fff;
    
        &.done {
          background-image: linear-gradient(#ffd76d, #ffba00);
    
          h3, h4 {
            color: #754c00;
          }
        }
        
        h3 {
          font-size: 16px;
          font-weight: bold;
        }
    
        h4 {
          font-size: 11px;
          margin-top: 5px;
        }
    
        &:nth-child(4n + 4) {
          margin: 0 0 20px 0;
        }
        
      }

      .deposit {
        height: 30px;
      }
      
      .status {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      
        h5 {
          font-size: 12px;
        }
      
        button {
          padding: 5px 10px;
          color: #890a00;
          border-radius: 5px;
          cursor: pointer;
      
          &.in {
            background-color: #ffba00;
            background: linear-gradient(155deg,#ffd76d,#ffba00);
          }
      
          &.out {
            background-color: #ece8e8;
          }
        }
      
        a {
          font-size: 12px;
          color: #fff;
        }
      }
      
      .deposit {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #333;
      
        span {
          display: inline-block;
          text-align: center;
          width: 16px;
          height: 16px;
          border-radius: 3px;
          line-height: 16px;
          font-size: 12px;
          font-weight: bold;
          color: #fff;
          background-color: #333;
          margin-right: 6px;
        }
      }
`;
