import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Container } from './Credit.styled';
import UserRank from '../../common/user-rank/UserRank';

import bojinIcon from '../../../assets/icons/bojin-gray.png';
import { toFixed } from '../../../utils/helper';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  componentWillMount() {
  }

  browse(path) {
    const url = `https://www.ee979.com${path}`;
    ipcRenderer.send('shell:openExternal', url);
  }

  render() {
    const { fwp, jifen, jifenLeft, orderNum: {buyCnt, sellCnt}, sRole: {isPlatinumTrader} } = this.props.myAllInfo;
    return (
      <Container>
        <div className="credit-bottom">
          <div className="as-buyer">
            <h2>买家信用</h2>
            <p>作为买家成交笔数：{ buyCnt }</p>
            <div className="stars">
              <UserRank count={buyCnt} />
            </div>
          </div>

          <div className="as-seller">
            <h2>卖家信用</h2>
            <p>作为卖家成交笔数：{ sellCnt }</p>
            <div className="stars">
              <UserRank count={ sellCnt } />
            </div>
          </div>

          {/* {!isPlatinumTrader && (
            <div className="bojin">
              <img src={bojinIcon} />
              <button onClick={() => this.browse('/personal/enter')}>入住铂金商户</button>
            </div>
          )} */}
        </div>

        <div className="wd-fee">
            <h3>平台积分：</h3>
            <span>累计积分：<em>{ toFixed(jifen) }</em></span>
            <span>剩余积分：<em>{ toFixed(jifenLeft) }</em></span>
            <div className="btn-wrap">
              <a onClick={() => this.browse('/personal/exchange')} className="no-bg">（记录查询）</a>
              <a onClick={() => this.browse('/points')} className="has-bg">积分换购</a>
            </div>
            
        </div>
        <div className="wd-fee">
            <h3>提现免费额度：</h3>
            <span>您当前剩余提现免费额度：<em>{ toFixed(fwp) }</em></span>
            <div className="btn-wrap">
                <a onClick={() => this.browse('/service/help?catId=22&newsSN=NS2017122614063902')} className="no-bg">（提现费率说明）</a>
                <a onClick={() => this.browse('/personal/finance/wdfree')} className="has-bg bg2">如何提升提现免费额度</a>
            </div>
            
        </div>
      </Container>
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
