import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Container, Row1, Row2, Col1, Cross, Info, Notice } from './Credit.styled';
import UserRank from '../../common/user-rank/UserRank';

import bojinIcon from '../../../assets/icons/bojin-gray.png';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  componentWillMount() {
  }
  

  handleNoticeClick(newsSN) {
    const url = `https://www.ee979.com/service/news/${newsSN}`;
    ipcRenderer.send('shell:openExternal', url);
  }

  render() {
    const { orderNum: {buyCnt, sellCnt}, sRole: {isPlatinumTrader} } = this.props.myAllInfo;
    return (
      <Fragment>
        <div class="credit-bottom">
          <div class="as-buyer">
            <h2>买家信用</h2>
            <p>作为买家成交笔数：{ buyCnt }</p>
            <div class="stars">
              <UserRank count={buyCnt} />
            </div>
          </div>

          <div class="as-seller">
            <h2>卖家信用</h2>
            <p>作为卖家成交笔数：{ sellCnt }</p>
            <div class="stars">
              <UserRank count={ sellCnt } />
            </div>
          </div>

          {!isPlatinumTrader && (
            <div class="bojin">
              <img src={bojinIcon} />
              <button routerLink="/personal/enter">入住铂金商户</button>
            </div>
          )}
        </div>

        <div class="wd-fee">
            <h3>平台积分：</h3>
            <span>累计积分：<em>{{ jifen | toFixed:2 }}</em></span>
            <span>剩余积分：<em>{{ jifenLeft | toFixed:2 }}</em></span>
            <div class="btn-wrap">
                <a routerLink="exchange" class="no-bg">（记录查询）</a>
                <a routerLink="/points" class="has-bg">积分换购</a>
            </div>
            
        </div>
        <div class="wd-fee">
            <h3>提现免费额度：</h3>
            <span>您当前剩余提现免费额度：<em>{{ fwp | toFixed:2 }}</em></span>
            <div class="btn-wrap">
                <a href="/service/help?catId=22&newsSN=NS2017122614063902"
                target="_blank" class="no-bg">（提现费率说明）</a>
                <a routerLink="finance/wdfree" class="has-bg bg2">如何提升提现免费额度</a>
            </div>
            
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  myAllInfo: state.app.myAllInfo,
})

const mapDispatchToProps = (dispatch) => ({
  setNotices: (data) => dispatch(setNotices(data)),
  updateMyInfo: (info) => dispatch(updateMyInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center)
