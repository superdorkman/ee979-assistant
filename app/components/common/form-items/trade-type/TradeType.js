import React, { Component } from 'react';
import { Wrapper } from './TradeType.styled';

export class TradeTypeComp extends Component {

  handleClick(tradeType) {
    if (tradeType === this.props.tradeType) return;
    this.props.onSelect('loc', 'tradeType', tradeType);
  }

  render() {
    const { tradeType } = this.props;

    return (
      <Wrapper>
        <h2>交易类型</h2>
        <div className="flex">
          <div className={tradeType === '寄售交易' ? "deal active" : 'deal'} onClick={() => this.handleClick('寄售交易')}>
            <h2>寄售交易</h2>
            <p>商品被购买后，EE979客服会登录账号，替您和买家完成交易。</p>
          </div>
          <div className={tradeType === '担保交易' ? "deal active" : 'deal'} onClick={() => this.handleClick('担保交易')}>
            <b>推荐</b>
            <h2>担保交易</h2>
            <p>商品被购买后，EE979会通知您上号进行交易，协助您和买家完成交易。</p>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default TradeTypeComp;
