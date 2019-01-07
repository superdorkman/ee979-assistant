import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Container } from './Info.styled';

import { toFixed } from '../../../utils/helper';

import MsgIcon from '../../common/icons/Msg';
import FinanceIcon from '../../common/icons/Finance';
import WarehouseIcon from '../../common/icons/Warehouse';

const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  componentWillMount() {
  }

  browse(path) {
    const url = `https://www.ee979.com${path}`;
    ipcRenderer.send('shell:openExternal', url);
  }

  render() {
    const { fund: {balance, free, frozen} } = this.props.myAllInfo;
    return (
      <Container>
        <div className="info-top">
            <div className="avail">
                <em>{toFixed(balance)}</em>
                <span className="label">我的可用余额</span>
            </div>
            <div className="total">
                <div>全部余额：
                    <em>{toFixed(free)}</em>
                </div>
                <div>冻结余额：
                    <em>{toFixed(frozen)}</em>
                </div>
            </div>
        </div>
        <div className="divider"></div>
        <div className="info-bottom">
            <ul className="list">
                <li onClick={() => this.browse('/personal/messages')}>
                    <div className="thumb msg">
                        <MsgIcon />
                    </div>
                    <span>未读消息</span>
                    {/* <span className="badge" *ngIf="messages > 0">{{ messages }}</span> */}
                </li>
                <li onClick={() => this.browse('/personal/purchased')}>
                    <div className="thumb buy"></div>
                    <span>已买到的商品</span>
                    {/* <span className="badge" *ngIf="goodsAlreadyBuyCnt > 0">{{ goodsAlreadyBuyCnt }}</span> */}
                </li>
                <li onClick={() => this.browse('/personal/sale')}>
                    <div className="thumb sale"></div>
                    <span>商品管理</span>
                    {/* <span className="badge" *ngIf="goodsOnSaleCnt > 0">{{ goodsOnSaleCnt }}</span> */}
                </li>
                <li onClick={() => this.browse('/personal/sold')}>
                    <div className="thumb sold"></div>
                    <span>订单管理</span>
                    {/* <span className="badge" *ngIf="goodsOnTradeCnt > 0">{{ goodsOnTradeCnt }}</span> */}
                </li>
                <li onClick={() => this.browse('/personal/sold')}>
                    <div className="thumb sold">
                        <WarehouseIcon />
                    </div>
                    <span>库存管理</span>
                    {/* <span className="badge" *ngIf="goodsOnTradeCnt > 0">{{ goodsOnTradeCnt }}</span> */}
                </li>
                <li onClick={() => this.browse('/personal/sold')}>
                    <div className="thumb sold">
                        <FinanceIcon />
                    </div>
                    <span>财务管理</span>
                    {/* <span className="badge" *ngIf="goodsOnTradeCnt > 0">{{ goodsOnTradeCnt }}</span> */}
                </li>
            </ul>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  myAllInfo: state.app.myAllInfo,
})

const mapDispatchToProps = (dispatch) => ({
  updateMyInfo: (info) => dispatch(updateMyInfo(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Center)
