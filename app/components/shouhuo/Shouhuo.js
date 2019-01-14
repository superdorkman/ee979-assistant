import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, LoadWrap, Nav, Content, Filter, MenuWrap, Form } from './Shouhuo.styled';
import Button from '../libs/button/Button';
import Loading from '../libs/loading/Loading';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';
import axios from 'axios';
import formatTime from '../../utils/formatTime';
import TableMenus from '../common/table-menus/TableMenus';

import Popover from '../libs/popover/Popover';
import MyDialog from '../common/my-dialog/MyDialog';
import CbSelectComp from '../common/form-items/cb-select/CbSelect';
import MultiSelectComp from '../common/form-items/multi-select/MultiSelect';
import InputComp from '../common/form-items/input/Input';
import TimeComp from '../common/form-items/time/Time';
import BestRadio from '../common/form-items/best-ratio/BestRadio';
import { openSnack } from '../../services/SnackbarService';
import NoItem from '../common/NoItem';

const tableMenus = [
  {type: 'all', text: '全部状态'},
  {type: 'ongoing', text: '收货中'},
  {type: 'pause', text: '已暂停'},
  {type: 'out3', text: '未进入前三'},
];

export class Finace extends Component {

  state = {
    selectedRecord: '所有记录',
    list: null,
    listFiltered: null,
    count: 0,
    areaName: '',
    serverName: '',
    goodsSN: '',
    serverNames: [],
    selectedState: '在线',
    curMenu: 'all',
    showDialog: false,
    controls: {},
    form: null
  }

  componentWillMount() {
    this.getList();
    if (this.props.sRole) {
      this.setOnlineState(this.props.sRole);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { sRole } = nextProps;
    this.setOnlineState(sRole);
  }

  setOnlineState({shipmentTrader}) {
    if (shipmentTrader && !shipmentTrader.online) {
      this.setState({ selectedState: '离线' });
    } 
  }

  getList() {
    axios.get('ShipmentTraders/myList')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            this.setState({ list: data, listFiltered: data });
          }
        }
      ).catch(err => {});
  }

  handleSelect = (option, index, ki) => {
    switch (ki) {
      case 'areaName':
        return this.handleAreaname(option);
      case 'serverName':
        return this.handleServername(option);
      case 'state':
        return this.changeState(option);
    }
  }

  handleAreaname(option) {
    const { serverList } = this.props;
    const serverNames = serverList.filter(v => v.areaName === option).map(v => v.serverName);
    this.setState({ areaName: option, serverNames });
  }

  handleServername(option) {
    this.setState({ serverName: option });
  }

  // 上下线
  changeState(option) {
    axios.get('ShipmentTraders/toggleOnline')
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            this.setState({ selectedState: option });
          } else if (error) {
            
          }
        }
      ).catch(err => {});
  }

  handleMenuSelect = (type) => {
    let listFiltered = [];
    const { list } = this.state;
    switch (type) {
      case 'all':
        listFiltered = [...list];
        break;
      case 'ongoing':
        listFiltered = list.filter(item => item.mask === 0 || item.mask === 2);
        break;
      case 'pause':
        listFiltered = list.filter(item => item.mask === 1 || item.mask === 3);
        break;
      case 'out3':
        listFiltered = list.filter(item => item.mask % 2 === 0 && item.top === 0);
        break;
    }
    this.setState({ curMenu: type, listFiltered });
  }

  getStatus(mask, top) {
    if ((mask == 0 || mask == 2) && top == 1) {
      return <span className="on">收货中(进入前三)</span>
    } else if ((mask == 0 || mask == 2) && top != 1) {
      return <span className="on">收货中(未进前三)</span>
    } else if (mask==1 || mask == 3) {
      return <span className="pause">已暂停</span>
    }
  }

  renderRows() {
    const { listFiltered } = this.state;
    if (!listFiltered) return;

    return listFiltered.map((item, idx) => {
      const { areaName, goodsSN, serverName, ratio, mask, minNum, totalNum, top, startH, endH } = item;
      return (
        <tr key={idx}>
          <td>{`${areaName}/${serverName}`}</td>
          <td>1元={ratio}</td>
          <td>{minNum}</td>
          <td>{totalNum}</td>
          <td>{this.getStatus(mask, top)}</td>
          <td>{(startH == 0 && endH == 0) ? '全天' : `${startH}}点 - ${endH}`}</td>
          <td>
            <button onClick={() => this.handleModify(goodsSN)}>修改</button>
            <button onClick={() => this.setBestRatio(goodsSN)}>一键第一</button>
            {(mask == 0 || mask == 2) && (
              <button onClick={() => this.togglePause(goodsSN, 'off')}>暂停</button>
            )}
            {(mask == 1 || mask == 3) && (
              <button onClick={() => this.togglePause(goodsSN, 'on')}>启用</button>
            )}
            <button onClick={() => this.handleDel(goodsSN)}>删除</button>
          </td>
        </tr>
      )
    });
  }

  setBestRatio(goodsSN) {
    const flag = confirm('确定设置为第一的比例吗？');
    if (!flag) return;
    axios.post('ShipmentTraders/bestRatio', { goodsSN })
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            const { list, listFiltered } = this.state;
            list.find(item => item.goodsSN === goodsSN).ratio = data;
            listFiltered.find(item => item.goodsSN === goodsSN).ratio = data;
            this.setState({ list, listFiltered });
          }
        }
      ).catch(err => {});
  }

  togglePause(goodsSN, status) {
    const flag = confirm(`确定${status === 'off' ? '暂停' : '启用'}此收货吗？`);
    if (!flag) return;
    axios.post('ShipmentTraders/onf', { goodsSN, status })
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            this.getList();
          }
        }
      ).catch(err => {});
  }

  handleDel(goodsSN) {
    const flag = confirm('确定删除此收货吗？');
    if (!flag) return;
    const body = { goodsSN };

    axios.post('ShipmentTraders/del', body)
      .then(
        res => {
          const { data } = res.data;
          if (data) {
            let { list, listFiltered } = this.state;
            list = list.filter(item => item.goodsSN !== goodsSN);
            listFiltered = listFiltered.filter(item => item.goodsSN !== goodsSN);
            this.setState({ list, listFiltered });
          }
        }
      ).catch(err => {});
  }

  handleModify(goodsSN) {
    this.setState({ goodsSN }, () => {
      this.handleAddShouhuo();
    });
  }

  handleAddShouhuo = () => {
    const { areaName, serverName, goodsSN } = this.state;
    if (!goodsSN && (!areaName || !serverName)) return openSnack('请先选择区服');
    const body = { 
      game: 'dnf',
      goodsType: '游戏币',
      areaName, serverName,
      goodsSN
    };
    axios.post('ShipmentTraders/form', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            const controls = this.buildForm(data);
            this.setState({ showDialog: true, controls, form: data });
          } else if (error) {
            openSnack(error);
            this.setState({ goodsSN: '' });
          }
        }
      ).catch(err => {});
  }

  hideDialog = () => {
    this.setState({ showDialog: false, goodsSN: '' })
  }

  buildForm(form) {
    const controls = {};
    form.forEach(f => {
      const { key: k, key1: k1, key2: k2, value, value1, value2, hidden } = f.data;
      if (!hidden) {
        if (k1) {
          controls[k1] = value1 || '';
          controls[k2] = value2 || '';
        } else {
          controls[k] = value || '';
        }
      }
    });

    return controls;
  }

  renderControls() {
    let { form } = this.state;
    if (!form) return;
    form = form.filter(c => !c.data.hidden);
    return form.map((item, idx) => <React.Fragment key={idx}>{this.getComponent(item)}</React.Fragment>);
  }

  getComponent(item) {
    const { selector, data } = item;
    data.ki = data.key;
    switch (selector) {
      case 'checkbox':
        return <CbSelectComp {...data} onChange={this.handleValueChanged} />
      case 'bRatio':
        return <BestRadio {...data} onChange={this.handleValueChanged} />
      case 'mSelect':
        return <MultiSelectComp {...data} onChange={this.handleValueChanged} />
      case 'input':
      case 'quantity':
        return <InputComp {...data} onChange={this.handleValueChanged} />
      case 'time':
        return <TimeComp {...data} onChange={this.handleValueChanged} />
      default:
        return null;
    }
  }

  handleValueChanged = (key, value) => {
    setTimeout(() => {
      this.setState({
        controls: {
          ...this.state.controls,
          [key]: value
        }
      });
    }, 0);
  }

  viewTrend = () => {
    const { history, match: { url }} = this.props;
    history.replace(`${url}/trend`);
  }

  handleSubmit = () => {
    const { controls, areaName, serverName, goodsSN } = this.state;

    const bundle = {
      game: 'dnf',
      areaName,
      serverName,
      goodsType: '游戏币',
      goodsSN,
      ...controls
    };
    
    axios.post('ShipmentTraders/add', { bundle })
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            openSnack(data);
            this.setState({ goodsSN: '', showDialog: false });
            this.getList();
          } else if (error) {
            openSnack(error);
          }
        }
      ).catch(err => {});
  }

  render() {
    const { areaNames, sRole: { shipmentTrader } } = this.props;
    const { areaName, list, listFiltered, serverName, serverNames, selectedState, curMenu, showDialog } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="blue">收货配置</Button> 
          <Button theme="gray" onClick={this.viewTrend}>收货商走势</Button> 
        </Nav>
        <Content>
          <SectionHeader title="收货配置" />
          <Filter>
            <Select style={{marginRight: 10}} selected={areaName} ki="areaName" 
              label="游戏区"
              options={areaNames} onSelect={this.handleSelect} />
            <Select selected={serverName} ki="serverName" options={serverNames} 
              label="游戏服"
              onSelect={this.handleSelect} />
            {/* <Select selected="游戏币" options={['游戏币']} onSelect={this.handleSelect} /> */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Select selected={selectedState} ki="state" label="在线状态" 
              onSelect={this.handleSelect} options={['在线', '离线']} />
              {selectedState === '离线' ? (<p className="status off">您的收货信息已隐藏，其它玩家不能下单。选择在线后恢复显示。</p>) : 
                (<p className="status">您的收货信息玩家可正常下单。选择离线后收货信息将会被隐藏。</p>)
              }
          </Filter>

          <MenuWrap>
            <TableMenus menus={tableMenus} curMenu={curMenu} onMenuSelect={this.handleMenuSelect} />
            <div className="btns">
              <Button style={{width: 88, height: 26, fontSize: 14}} theme="yellow" onClick={this.handleAddShouhuo}>新增收货</Button> 
            </div>
          </MenuWrap>

          <table>
            <thead>
              <tr>
                <th>游戏区服</th>
                <th>收货比例</th>
                <th>最小收货量</th>
                <th>最大收货量</th>
                <th>状态</th>
                <th>开启时间</th>
                <th>操作</th>
              </tr>
            </thead>
            {!!list && (
              <tbody>
                {this.renderRows()}
              </tbody>
            )}
          </table>
          {!!list && !listFiltered.length && <NoItem>没有收货信息</NoItem>}

          {!list && (
            <LoadWrap><Loading /></LoadWrap>
          )}
        </Content>

        <Popover show={showDialog} isLocal={true} dismiss={this.hideDialog}>
          <MyDialog title="新增收货" extra="">
            <Form>
              {this.renderControls()}
              <div className="btns">
                <Button theme="yellow" onClick={this.handleSubmit}>保存</Button>
                <Button onClick={this.hideDialog}>取消</Button>
              </div>
            </Form>
          </MyDialog>
        </Popover>

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  sRole: state.app.myAllInfo.sRole,
  areaNames: state.game.areaNames,
  serverList: state.game.serverList,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Finace)
