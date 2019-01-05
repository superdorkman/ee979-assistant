import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { Container, Filter, Content, LoadWrap } from './Orders.styled';

import Select from '../libs/select/Select';
import axios from 'axios';
import { API_URL } from '../../constants/url';

import formatTime from '../../utils/formatTime';
import Button from '../libs/button/Button';
import Pagination from '../libs/pagination/Pagination';
import Loading from '../libs/loading/Loading';

import DateRange from '../common/date-range/DateRange';

const goodsTypes = ['游戏币'];
const orderTypes = ['出货订单', '收货订单'];
const dateTypes = ['默认', '今日', '7天', '30天', '自定义日期'];
const crosses = ['跨1','跨2','跨3a','跨3b','跨4','跨5','跨6','跨7','跨8'];
const theads = [
  {label: '发货方式'},
  {label: '订单时间'},
  {label: '订单编号'},
  {label: '总量'},
  {label: '总价'},
  {label: '比例'},
  {label: '单价'},
  {label: '跨区', chu: true},
  {label: '买家区服', chu: true},
  {label: '收货角色名', chu: true},
  {label: '状态'},
  {label: '沟通'},
  {label: '操作'},
];

export class Orders extends Component {

  state = {
    selectedType: '游戏币',
    selectedOrder: '出货订单',
    selectedDate: '默认',
    selectedArea: '',
    selectedServer: '',
    selectedCross: '',
    serverNames: [],
    page: 1,
    size: 12,
    list: null,
    count: 0,
    filter: {
      game: 'dnf',
      areaName: '',
      serverName: '',
      goodsType: '游戏币',
      orderSN: '',
      status: '',
    }
  }

  componentWillMount() {
    this.getOrders();
  }

  getOrders() {
    const { filter, page, size, selectedOrder } = this.state;
    const body = { filter, page, size };
    const path = selectedOrder === '出货订单' ? '/Goods/myGoodsSold' : '/ShipmentTraders/myBuyOrder';
    axios.post(`${API_URL}${path}`, body)
      .then(
        res => {
          const { data, error, page } = res.data;
          if (data) {
            this.setState({ 
              list: data,
              count: page.count, 
            });
          }
        }
      ).catch(err => {});
  }

  // 状态
  transformStatus(en) {
    switch (en) {
      case 'payed':
        return '已付款';
      case 'operated':
        return '已发货';
      case 'failed':
        return '已失败';
      case 'finish':
      case 'transfered':
        return '已完成';
      default:
        return en;
    }
  }

  handleSelect = (option, index, ki) => {
    switch (ki) {
      case 'areaName':
        const { serverList } = this.props;
        const serverNames = serverList.filter(v => v.areaName === option).map(v => v.serverName);
        this.setState({
          selectedArea: option,
          serverNames,
        });
      case 'serverName':
        this.setState({
          selectedServer: option,
        });
      case 'selectedOrder':
        this.setState({ [ki]: option }, () => {
          this.getOrders();
        });
    }
    
  }

  changeOrder() {
    console.log('chaneg order')
  }

  renderTHeads() {
    const isChuhuo = this.state.selectedOrder === '出货订单';
    let heads = [...theads];
    if (!isChuhuo) {
      heads = theads.filter(h => !h.chu);
    }
    
    return heads.map((head, idx) => {
      const { label } = head;
      return (
        <th key={idx}>{label}</th>
      )
    });
  }

  renderRows() {
    const { list, selectedOrder } = this.state;
    
    const isChuhuo = selectedOrder === '出货订单';
    return list.map((item, idx) => {
      const { created, delivery, character, coins, orderSN, buyNum, price, unitPrice, areaName, serverName, cross, name, status } = item;

      return (
        <tr key={orderSN}>
          <td>{delivery}</td>
          <td>{formatTime(created, 'full')}</td>
          <td>{orderSN}</td>
          <td>{coins}万金</td>
          <td>{price}元</td>
          <td>{50}</td>
          <td>{unitPrice}</td>
          {isChuhuo && (
            <Fragment>
              <td>{cross}</td>
              <td>{areaName}-{serverName}</td>
              <td>{character}</td>
            </Fragment>
          )}
          
          <td className={status}>{this.transformStatus(status)}</td>
          <td>
            <Button theme="blue">联系买家</Button> 
          </td>
          <td>
            {this.getOpButton(isChuhuo, item)}
          </td>
        </tr>
      )
    });
  }

  getOpButton(isChuhuo, item) {
    const { status, orderSN } = item;
    if (isChuhuo) {
      if (status === 'payed') {
        return <Button theme="blue" onClick={() => this.handleSend(item)}>确认发货</Button>;
      }
    } else {
      if (status === 'pending') {
        return <Button theme="blue">立即支付</Button>;
      }
    }

    return null;
  }

  handleSend({orderSN, title}) {
    const flag = confirm(`${title}\r确定给买家发货吗`);
    console.log(flag)
  }

  // 改变一页显示数目
  handleSizeChange = (size) => {
    this.setState({ size }, () => {
      this.getOrders();
    });
  }

  // 选择第几页
  handlePageSelect = (page) => {
    this.setState({ page }, () => {
      this.getOrders();
    });
  }

  render() {
    const { selectedType, selectedOrder, selectedDate, selectedArea, selectedServer, selectedCross, count, page, size, list, serverNames } = this.state;
    const { areaNames } = this.props;
    return (
      <Container>
        <Filter>
          <div className="item">
            <span>商品类型: </span>
            <Select selected={selectedType} options={goodsTypes} onSelect={this.handleSelect} />
          </div>
          <div className="item">
            <span>订单类型: </span>
            <Select selected={selectedOrder} ki="selectedOrder" options={orderTypes} onSelect={this.handleSelect} />
          </div>
          {/* <div className="item">
            <span>交易时间: </span>
            <Select selected={selectedDate} ki="selectedDate" options={dateTypes} onSelect={this.handleSelect} />
          </div> */}
          <DateRange />
        </Filter>
        <Filter>
          <div className="item">
            <span>游戏区服: </span>
            <Select selected={selectedArea} options={areaNames} 
              label="选择区" ki="areaName"
              onSelect={this.handleSelect} /> &nbsp;&nbsp;
            <Select selected={selectedServer} options={serverNames}
              label="选择服" ki="serverName"
              onSelect={this.handleSelect} /> &nbsp;&nbsp;
            <Select selected={selectedCross} options={crosses} 
              label="选择跨区" ki="cross"
              onSelect={this.handleSelect} />
          </div>
        </Filter>
        <Content>
          <div className="head">
            <h2>{selectedType}/{selectedOrder}</h2> 
            <Select selected={selectedType} options={goodsTypes} onSelect={this.handleSelect} />
          </div>
          <table>
            <thead>
              <tr>
                {this.renderTHeads()}
              </tr>
            </thead>
            {!!list && (
              <tbody>
                {this.renderRows()}
              </tbody>
            )}
          </table>
          {!list && (
            <LoadWrap><Loading /></LoadWrap>
          )}
          {!!list && (
            <Pagination count={count} page={page} size={size} 
            onSizeChange={this.handleSizeChange}
            onSelect={this.handlePageSelect} />
          )}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  areaNames: state.game.areaNames,
  serverList: state.game.serverList,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
