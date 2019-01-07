import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Table, Filter, Form, Button } from './Warehouse.styled';
import SectionHeader from '../common/section-header/SectionHeader';
import axios from 'axios';
import Select from '../libs/select/Select';

import Popover from '../libs/popover/Popover';
import MyDialog from '../common/my-dialog/MyDialog';
import MyButton from '../libs/button/Button';
import Plus from '../common/icons/Plus';
import Minus from '../common/icons/Minus';

import { toFixed } from '../../utils/helper';

import History from './history/History';

const types = ['全部类型', '出金', '收金'];
const crosses = ['全部跨区', '跨1', '跨2', '跨3a', '跨3b', '跨4', '跨5', '跨6', '跨7', '跨8'];

export class Center extends Component {

  state = {
    data: {},
    showDialog: false,
    selectedCross: '',
    cnt: '',
    price: '',
    remark: '',
    shou: 0,
    chu: 0,
    balance: 0,
    tradeType: '',
  }

  componentWillMount() {
    this.getStock();
  }

  getStock() {
    if (this.props.notices) return;
    const phone = localStorage.getItem('username');
    const body = { phone: parseInt(phone), time: new Date() };
    axios.post('http://101.37.35.234:3333/api/SelfAllots/dailyInfo', body)
      .then(
        res => {
          const { msg } = res.data;
          if (msg === 'success') {
            // this.props.setNotices(data);
            let shou = 0;
            let chu = 0;
            let balance = 0;
            Object.keys(res.data).forEach(key => {
              if (key.indexOf('shou') > -1) {
                shou += res.data[key];
              } else if (key.indexOf('chu') > -1) {
                chu += res.data[key];
              } else if (key.indexOf('stock') > -1) {
                balance += res.data[key];
              }
            });

            this.setState({ data: res.data, shou, chu, balance });
            
          }
        }
      ).catch(err => {})
  }

  renderRows() {
    const { data } = this.state;
    return ['1','2','3a','3b','4','5','6','7','8'].map((cross, idx) => {
      const chu = data[`cross_${cross}_chu`] || 0;
      const shou = data[`cross_${cross}_shou`] || 0;
      const stock = data[`cross_${cross}_stock`] || 0;
      return (
        <tr key={idx}>
          <td>跨{cross}</td>
          <td>{chu}万金</td>
          <td>{shou}万金</td>
          <td>{stock}万金</td>
          <td>
            <Button onClick={() => this.handleRuku('shou', cross)}>
              <span>入库</span>
              <Plus fill="#fff" />
            </Button>
            <Button onClick={() => this.handleRuku('chu', cross)}>
              <span>出库</span>
              <Minus fill="#fff" />
            </Button>
          </td>
        </tr>
      )
    })
  }

  handleIptChange(e, ki) {
    this.setState({
      [ki]: e.target.value,
    })
  }

  handleRuku(tradeType, cross) {
    this.setState({ showDialog: true, selectedCross: cross, tradeType })
  }

  onRuku = () => {
    const { cnt, price, remark, selectedCross, data, tradeType } = this.state;
    const phone = localStorage.getItem('username');
    const body = { 
      phone: parseInt(phone), 
      tradeType,
      cross: `cross_${selectedCross}`,
      cnt: parseFloat(cnt), price: parseFloat(price), remark,
    };
    axios.post('http://101.37.35.234:3333/api/SelfAllots/turnover', body)
      .then(
        res => {
          if (res.data) {
            data[`cross_${selectedCross}_${tradeType}`] +=  parseFloat(cnt);
            if (tradeType === 'shou') {
              data[`cross_${selectedCross}_stock`] +=  parseFloat(cnt);
            } else if (tradeType === 'chu') {
              data[`cross_${selectedCross}_stock`] -=  parseFloat(cnt);
            }
            
            this.setState({  
              cnt: '',
              price: '',
              remark: '',
              data,
            });
            this.hideDialog();
          }
        }
      ).catch(err => {})
  }

  hideDialog = () => {
    this.setState({ showDialog: false })
  }

  render() {
    const { showDialog, selectedCross, cnt, price, remark, chu, shou, balance } = this.state;

    return (
      <Container>
        <SectionHeader title="库存统计" />
        <div className="today-total">
          <span>今日出货总计：{chu}万金</span>
          <span>今日收货总计：{shou}万金</span>
          <span>仓库剩余总库存：{balance}万金</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>跨区</th>
              <th>今日出货</th>
              <th>今日收货</th>
              <th>仓库剩余金币</th>
              <th>库存修改</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>

        <History />

        <Popover show={showDialog} isLocal={true} dismiss={this.hideDialog}>
          <MyDialog title="【入库】金币数量" extra={`跨${selectedCross}`}>
            <Form>
              <div className="ipt-wrap">
                <span className="label">金币数：</span>
                <input placeholder="请输入金币数量" value={cnt} onChange={(e) => this.handleIptChange(e, 'cnt')} />
                <span className="unit">万金</span>
              </div>
              <div className="ipt-wrap">
                <span className="label">价格：</span>
                <input placeholder="请输入价格" value={price} onChange={(e) => this.handleIptChange(e, 'price')} />
                <span className="unit">元</span>
              </div>
              <div className="ipt-wrap">
                <span className="label">备注：</span>
                <textarea placeholder="请输入备注信息（可不填）" value={remark} onChange={(e) => this.handleIptChange(e, 'remark')} />
              </div>
              <div className="ratio">当前输入比例：
                <em>{price ? toFixed(cnt/price) : ''}</em>
              </div>
              <div className="btn-group">
                <MyButton style={{width: 120, height: 40}} theme="yellow" onClick={this.onRuku}>入库</MyButton>
                <MyButton style={{width: 120, height: 40}} onClick={this.hideDialog}>取消</MyButton>
              </div>
            </Form>
          </MyDialog>
        </Popover>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Center)
