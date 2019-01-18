import styled from 'styled-components';

export const Container = styled.div`
  width: 670px;
  height: 280px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 30px 30px 0 30px;
  border-radius: 3px;
  margin-bottom: 10px;

  .credit-bottom {
    display: flex;
    // justify-content: space-between;
  }

  .as-buyer, .as-seller {
    margin-right: 60px;

    h2 {
        color: #373737;
        font-weight: bold;
    }

    p {
        margin: 6px 0 12px;
    }

    .stars {
      display: flex;
    }
  }

  .bojin {
    display: flex;
    align-items: center;

    button {
        height: 24px;
        padding: 0 6px;
        font-size: 12px;
        color: #fff;
        border-radius: 5px;
        background-image: linear-gradient(#7b7eff, #6266ff);
        margin-left: 5px;
    }
  }

  .wd-fee {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e2e2e2;
    padding: 20px 0;
    font-size: 12px;

    span {
        margin-right: 10px;
        color: #626262;

        em {
            color: #e41314;
            font-weight: bold;
            font-size: 14px;
        }
    }

    .no-bg {
        color: #a40000;
    }

    .has-bg {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        background: linear-gradient(#ffd76d,#ffba00);
        border-radius: 3px;
        color: #754c00;
        padding: 0 10px;

        &.bg2 {
            background-image: linear-gradient(#7b7eff, #6266ff);
            color: #fff;
        }
    }

    .btn-wrap {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    h3 {
        font-size: 16px;
        color: #333;
        font-weight: bold;
    }
}
`;
