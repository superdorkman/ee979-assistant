import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { toggleOrderDetail } from '../../actions/app';
import { Container, Filter, Content, LoadWrap } from './Orders.styled';

import Select from '../libs/select/Select';
import axios from 'axios';
import { API_URL } from '../../constants/url';

import formatTime from '../../utils/formatTime';
import Button from '../libs/button/Button';
import Pagination from '../libs/pagination/Pagination';
import Loading from '../libs/loading/Loading';

import DateRange from '../common/date-range/DateRange';
import { openUrl } from '../../services/extenals';
import { toFixed } from '../../utils/helper';
import { openSnack } from '../../services/SnackbarService';
import TableMenus from '../common/table-menus/TableMenus';

import NoItem from '../common/NoItem';

const { ipcRenderer } = window.require('electron');

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
  {label: '件数', chu: true},
  {label: '跨区'},
  {label: '买家区服'},
  {label: '收货角色名', chu: true},
  {label: '状态'},
  {label: '沟通'},
  {label: '操作'},
];

const chuMenus = [
  {type: '', text: '全部订单'},
  {type: 'payed', text: '待发货'},
  {type: 'operated', text: '已发货'},
  {type: 'traded', text: '延时转款中'},
  {type: 'transfered', text: '交易成功'},
  {type: 'failed', text: '交易失败'},
];

const shouMenus = [
  {type: '', text: '所有订单'},
  {type: 'created', text: '等待支付'},
  {type: 'payed', text: '交易中'},
  {type: 'transfered', text: '交易成功'},
  {type: 'canceled', text: '已赔付'},
  {type: 'failed', text: '交易失败'},
];

export class Orders extends Component {

  state = {
    showDetail: false,
    selectedType: '游戏币',
    selectedOrder: '出货订单',
    selectedDate: '默认',
    selectedArea: '',
    selectedServer: '',
    selectedCross: '',
    serverNames: [],
    page: 1,
    size: 20,
    list: null,
    count: 0,
    todos: {},
    filter: {
      game: 'dnf',
      areaName: '',
      serverName: '',
      goodsType: '游戏币',
      orderSN: '',
      status: '',
      created: '',
    },
    menus: chuMenus,
    curMenu: '',
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
          const { data, error, page, count } = res.data;
          if (data) {
            this.setState({ 
              list: data,
              count: page.count, 
              todos: count
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
          selectedCross: '',
          serverNames,
          filter: {
            ...this.state.filter,
            areaName: option,
            serverName: '',
            cross: '',
          }
        });
        break;
      case 'serverName':
        this.setState({
          selectedServer: option,
          filter: {
            ...this.state.filter,
            serverName: option,
            page: 1,
          }
        }, () => {
          this.getOrders();
        });
        break;
      case 'cross':
        this.setState({ 
          selectedCross: option,
          selectedArea: '',
          selectedServer: '',
          serverNames: [],
          filter: {
            ...this.state.filter,
            areaName: '',
            serverName: '',
            cross: `DNF${option}`,
          }
        }, () => {
          this.getOrders();
        });
        break;
    }
    
  }

  changeOrderType = (option, index, ki) => {
    this.setState({
      selectedDate: '默认',
      selectedOrder: option,
      selectedArea: '',
      selectedServer: '',
      selectedCross: '',
      serverNames: [],
      filter: {
        ...this.state.filter,
        cross: '',
        created: '',
        status: '',
      },
      menus: option === '出货订单' ? chuMenus : shouMenus,
      curMenu: '',
    }, () => {
      this.getOrders();
    })
  }

  handleDateChange = (option, created) => {
    this.setState({
      selectedDate: option,
      filter: {
        ...this.state.filter,
        created
      }
    }, () => {
      this.getOrders();
    })
  }

  reset = () => {
    const { selectedArea, selectedServer, selectedCross } = this.state;
    if (!selectedArea && !selectedServer && !selectedCross) return;

    this.setState({
      selectedArea: '',
      selectedServer: '',
      selectedCross: '',
      filter: {
        ...this.state.filter,
        areaName: '',
        serverName: '',
        cross: '',
        // created: '',
      }
    }, () => {
      this.getOrders();
    });
  }

  handleMenuSelect = (type) => {
    this.setState({
      curMenu: type,
      page: 1,
      filter: {
        ...this.state.filter,
        status: type,
      }
    }, () => {
      this.getOrders();
    });
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

  viewOrder(orderSN) {
    // const url = `https://www.ee979.com/order/${orderSN}`;
    // openUrl(url);
    this.props.toggleOrderDetail({showOd: true, orderSN});
  }

  hideDetail = () => {
    this.setState({ showDetail: false });
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
          <td>{toFixed(coins/price)}</td>
          <td>{unitPrice}</td>
          {isChuhuo && <td>{buyNum}件</td>}
          <td>{cross}</td>
          <td>{areaName}-{serverName}</td>
          {isChuhuo && <td onClick={() => this.handleCopy(character)}>{character}</td>}
          <td className={status}>{this.transformStatus(status)}</td>
          <td>
            <Button theme="blue" onClick={() => this.viewOrder(orderSN)}>
              {isChuhuo ? '联系买家' : '联系卖家'}
            </Button> 
          </td>
          <td>
            {this.getOpButton(isChuhuo, item)}
          </td>
        </tr>
      )
    });
  }

  handleCopy(character) {
    openSnack('角色复制成功');
    ipcRenderer.send('clipboard:copy', character);
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
    if (!flag) return;
    const body = {
      orderSN,
      op: 'success',
    }
    axios.post('Orders/opSeller', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            // this.order.status = 'operated';
          }
        }
      ).catch(err => {})
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
    const { menus, curMenu, showDetail, selectedType, selectedOrder, selectedDate, selectedArea, selectedServer, selectedCross, count, todos, page, size, list, serverNames } = this.state;
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
            <Select selected={selectedOrder} options={orderTypes} onSelect={this.changeOrderType} />
          </div>
          <DateRange emitDate={this.handleDateChange} selectedDate={selectedDate} />
        </Filter>
        <Filter>
          <div className="item">
            <span>游戏区服: </span>
            <Select selected={selectedArea} options={areaNames} 
              label="选择区" ki="areaName"
              onSelect={this.handleSelect} /> &nbsp;&nbsp;
            <Select selected={selectedServer} options={serverNames}
              label="选择服" ki="serverName"
              onSelect={this.handleSelect} /> &nbsp;&nbsp;&nbsp;&nbsp;
            <span>游戏跨区: </span>
            <Select selected={selectedCross} options={crosses} 
              label="选择跨区" ki="cross"
              onSelect={this.handleSelect} />
          </div>

          <Button theme="yellow" onClick={this.reset}>重置</Button>
        </Filter>
        <Content>
          <div className="head">
            <h2>{selectedType}/{selectedOrder}</h2> 
            <TableMenus menus={menus} count={todos}
              curMenu={curMenu} onMenuSelect={this.handleMenuSelect} />
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
          {!!list && list.length === 0 && (
            <NoItem>没有相关订单</NoItem>
          )}
          {!list && (
            <LoadWrap><Loading /></LoadWrap>
          )}
          {!!list && !!count && (
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

const mapDispatchToProps = dispatch => ({
  toggleOrderDetail: info => dispatch(toggleOrderDetail(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
