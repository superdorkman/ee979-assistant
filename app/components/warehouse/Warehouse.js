import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Table, Filter, Form, Button } from './Warehouse.styled';
import SectionHeader from '../common/section-header/SectionHeader';
import axios from 'axios';
import Select from '../libs/select/Select';

import Popover from '../libs/popover/Popover';
import MyDialog from '../common/my-dialog/MyDialog';
// import Button from '../libs/button/Button';
import Plus from '../common/icons/Plus';
import Minus from '../common/icons/Minus';

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
  }

  componentWillMount() {
    // this.getStock();
  }

  getStock() {
    if (this.props.notices) return;
    // const phone = localStorage.getItem('username');
    const body = { phone: 13362032853, time: new Date() };
    axios.post('http://101.37.35.234:3333/api/SelfAllots/dailyInfo', body)
      .then(
        res => {
          const { msg } = res.data;
          if (msg === 'success') {
            // this.props.setNotices(data);
            this.setState({ data: res.data });
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
            <Button theme="blue" onClick={() => this.handleRuku(cross)}>
              <span>入库</span>
              <Plus fill="#fff" />
            </Button>
            <Button theme="blue">
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

  handleRuku(cross) {
    this.setState({ showDialog: true, selectedCross: cross })
  }

  onRuku = () => {

  }

  hideDialog = () => {
    this.setState({ showDialog: false })
  }

  render() {
    const { showDialog, selectedCross, cnt, price, remark, } = this.state;

    return (
      <Container>
        <SectionHeader title="库存统计" />
        <div className="today-total">
          <span>今日出货总计：888888.88万金</span>
          <span>今日收货总计：888888.88万金</span>
          <span>仓库剩余总库存：888888.88万金</span>
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

        <Filter>
          <Select options={crosses} selected="全部跨区" />
          <Select options={types} selected="全部类型" />
        </Filter>

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
              <div className="ratio">当前输入比例：</div>
              <div className="btn-group">
                <Button style={{width: 120, height: 40}} theme="yellow" onClick={this.onRuku}>入库</Button>
                <Button style={{width: 120, height: 40}} theme="gray" onClick={this.hideDialog}>取消</Button>
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
