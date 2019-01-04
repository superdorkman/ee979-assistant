import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, LoadWrap, Nav, Content } from './Withdraw.styled';
import Button from '../../libs/button/Button';
import SectionHeader from '../../common/section-header/SectionHeader';
import { toFixed, decimalAdjust, trimDecimal } from '../../../utils/helper';

// import Select from '../../libs/select/Select';
import axios from 'axios';
// import formatTime from '../../../utils/formatTime';

// import Loading from '../../libs/loading/Loading';

class Withdraw extends Component {

  state = {
    amount: '',
    bindInfo: {},
    curType: 'aliPay',
    enterPwd: false,
    payPwd: '',
    actualAmount: '',
    freeWD: 0,
    freeWDB: 0,
    fee: 0,
  }

  componentWillMount() {
    this.getBindInfo();
    this.getFundPool();
  }

  getBindInfo() {
    axios.get('Funds/getBindInfo')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            this.setState({ bindInfo: data });
          }
        }
      ).catch(err => {});
  }

  getFundPool() {
    axios.get('FundWithdrawPools/balance')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            this.freeWD = data;
            this.freeWDB = data;
          } else {

          }
        }
      ).catch(err => {});
  }


  handleClick = () => {
    this.props.history.push('/finance');
  }

  choosePay(type) {
    this.setState({ curType: type });
  }

  moveAll = () => {
    const { free } = this.props.fund;
    if (free < 5) {
      return alert('余额不足5元, 单笔提现至少5元');
    }
    this.setState({ actualAmount: String(free) }, () => {
      this.onCalcFee();
    })
  }

  onCalcFee() {
    let { actualAmount, freeWDB, curType, fee } = this.state;
    if (Number.isNaN(Number(actualAmount))) {
      return;
    }
    if (!Number.isNaN(Number(actualAmount)) && freeWDB > 0) {
      // this.freeWD = this.freeWDB - this.actualAmount;
    }
    let _actualAmount = trimDecimal(actualAmount);
    
    if (_actualAmount > freeWDB) {
      _actualAmount = _actualAmount - freeWDB;
    } else {
      return this.setState({ fee: 0 });
    }
    if (curType === 'aliPay') {
      let _fee = _actualAmount * .009;
      if (_fee <= 1) {
        fee = 1;
      } else {
        fee = decimalAdjust(Math.min(_fee, 45), 2);
      }
      
    } else if (curType === 'wxPay') {
      let _fee = _actualAmount * .013;
      if (_fee <= 1) {
        fee = 1;
      } else {
        fee = decimalAdjust(Math.min(_fee, 45), 2);
      }
    }
    this.setState({ fee });
  }

  onTrim() {
    this.actualAmount = trimDecimal(this.actualAmount);
  }

  goBind(type) {
    
  }

  render() {
    const { balance, free } = this.props.fund;
    const { bindInfo: {bindAliPay, bindWxPay, account, nickname}, freeWD, fee, actualAmount, curType } = this.state;

    return (
      <Container>
        <Nav>
          <Button onClick={this.handleClick}>资金明细</Button> 
          <Button theme="blue">提现管理</Button> 
        </Nav>
        <Content>
          <SectionHeader title="提现管理" />
          <div className="balance">
            <span>总资产：
              <b>
                <i>&yen; {toFixed(balance)}</i>
              </b> 可提现余额：
              <b>
                <i>&yen; {toFixed(free)}</i>
              </b>
            </span>
          </div>

        <div className="withdr_info">
          <ul>
            <li>
              <span>提现方式</span>
              <div className="card_infor">
                <div className={ curType === 'aliPay'? 'card_infor_list ali' : 'card_infor_list'} onClick={() => this.choosePay('aliPay')}>
                  <div className="card_n">
                    <label className="round_label">
                      <div className="round_box"></div>
                      支付宝
                    </label>
                  </div>
                  <div className="card_t">
                    <b className="bblue">支付宝</b>
                  </div>
                  <div className="card_a">{ account ? account : '尚未绑定' }</div>
                  <div className="card_p">支付宝提现资金到帐时间为2小时</div>
                  <div className="card_s blue" onClick={() => goBind('aliPay')}>{ account ? '修改绑定' : '立即绑定'}</div>
                </div>

                <div className={ curType === 'wxPay'? 'card_infor_list wx' : 'card_infor_list'} onClick={() => this.choosePay('wxPay')}>
                  <div className="card_n">
                    <label className="round_label">
                      <div className="round_box"></div>
                      微信
                    </label>
                  </div>
                  <div className="card_t">
                    <b className="bgreen">微信</b>
                  </div>
                  <div className="card_a">{ nickname ? nickname : '尚未绑定' }</div>
                  <div className="card_p">提现资金到帐时间为2小时</div>
                  <div className="card_s green" onClick={() => this.goBind('wxPay')}>{ nickname ? '修改绑定' : '立即绑定' }</div>
                </div>
              </div>
            </li>
            <li>
              <span>提现金额</span>
              <div className="card_infor">
                <div className="money-ipt">
                  <input placeholder="单笔提现不少于5元" pattern="^\d*(\.?\d+)?$" autocomplete="off" name="amount"
                    required onInput="onCalcFee(amount.valid)" onBlur="onTrim()" />
                  <b className="get-all" onClick={this.moveAll}>全部提出</b>
                  <p>&nbsp;&nbsp;剩余提现免费额度<em>{toFixed(freeWD > 0 ? freeWD : 0)}</em>
                  </p>
                </div>
                <p>本次提现手续费<em>{fee}元</em>，实际到账<em>{toFixed(actualAmount - fee)}</em>元</p>

              </div>
            </li>
            <li>
              <span>支付密码</span>
              <div className="card_infor">
                <input placeholder="请输入支付密码" autocomplete="off" />
              </div>
            </li>
            <li>
              <span></span>
              <div className="card_infor">
                <button className="per_btn" onClick="onWithdraw()">立即提现</button>
              </div>
            </li>
          </ul>
        </div>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  fund: state.app.myAllInfo.fund,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdraw)
