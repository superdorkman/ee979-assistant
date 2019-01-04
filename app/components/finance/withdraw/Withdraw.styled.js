import styled from 'styled-components';

export const Container = styled.div`

  .balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ececec;
    padding: 30px 0 25px;
    span {
        font-size: 14px;
        color: #333;
        font-weight: 700;
        b {
            color: #ff4e00;
            margin-right: 50px;
            i {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }

    a {
        font-size: 14px;
        color: #01707A;
    }
  }


  .withdr_info {
    display: flex;
    justify-content: center;
    padding: 60px 0 10px 0;
    border-bottom: 1px solid #ececec;
  }
  .withdr_info  li {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 22px;
    align-items: center;
  }
  .withdr_info  li span {
    align-self: flex-start;
    font-size: 14px;
    color: #333;
    margin-right: 30px;
    display: inline-block;
    width: 65px;
    text-align: right;
    font-weight: bold;
  }

  .withdr_info .card_infor_list{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 55px;
    border: 2px solid #ececec;
    padding: 0 30px;
    margin-bottom: 20px;
    position: relative;
    border-radius: 5px;

    &.ali {
        border-color: #26b7ff;
    }

    &.wx {
        border-color: #3bce30;
    }

  }

  .money-ipt {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    p em {
        color: red;
        margin-left: 0;
    }

    button {
        width: 145px;
        height: 28px;
        background: linear-gradient(#7b7eff,#6266ff);
        color: #fff;
        border-radius: 5px;
        font-size: 12px;
    }
  }
  em {
    font-size: 12px;
    color: red;
    margin-left: 10px;
    font-weight: bold;
  }
  .card_infor_list .card_n,
  .card_infor_list .card_t,
  .card_infor_list{
    font-size: 16px;
    color: #333;
  }
  .card_infor_list .card_n{
    width: 160px
  }
  .card_infor_list .card_t{
    width: 100px
  }
  .card_infor_list .card_t b{
    width: 44px;
    height: 24px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    margin-left: 15px;

  }
  .card_infor_list .card_a{
    width: 150px;
    font-size: 12px;
    color: #999;
  }
  .card_infor_list .card_p{
    width: 220px;
    font-size: 12px;
  }
  .card_infor_list .card_s{
    width: 100px;
    font-size: 12px;
  }
  label.round_label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  .round_box{
    width: 14px;
    height: 14px;
    border-radius: 50px;
    border: 1px solid #cecece;
    margin-right: 18px;
  }
  .round_box input{
    width:14px;
    height: 14px;
    opacity: 0;
  }
  .checked {
    background: url("/assets/images/ionic.png") -123px -57px;
    border: none;
  }

  .card_infor_list{
    cursor: pointer;
  }


  .card_infor input {
    width: 202px;
    height: 38px;
    font-size: 13px;
    padding-left: 10px;
    border: 1px solid #ececec;
    border-radius: 5px;
  }
  .card_infor .get-all {
    font-size: 14px;
    color: #906E49;
    width: 80px;
    height: 36px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    background: #ffba00;
    background-image: linear-gradient(155deg, #ffd76d, #ffba00);
  }
  .card_infor p {
    font-size: 12px;
    color: #999;
    // margin-top: 18px;
  }
  .per_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 46px;
    margin-top: 20px;
    background: #ffba00;
    color: #906E49;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
    border: 1px solid  #ffba00;
    border-radius: 5px;
    background-image: linear-gradient(155deg, #ffd76d, #ffba00);

    .loader {
        display: flex;
        margin: 0 20px 0 -5px;
    }
  }

  .withdraw_tip {
    margin-top: 36px;
    h2 {
        font-size: 18px;
        margin-bottom: 10px;
    }
  }
  .withdraw_tip ul li {
    font-size: 14px;
    color: #666;
    margin-bottom: 6px;
  }

  
`;

export const LoadWrap = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  border-radius: 5px;
  background-color: #fff;
  padding: 0 30px;
  margin-bottom: 15px;

  button {
    margin-right: 10px;
  }
`;

export const Content = styled.div`
  padding: 20px 30px;
  border-radius: 5px;
  background-color: #fff;
`;
