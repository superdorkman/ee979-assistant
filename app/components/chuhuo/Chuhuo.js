import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter, MenuWrap, Form } from './Chuhuo.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';

import Select from '../libs/select/Select';
import axios from 'axios';
import formatTime from '../../utils/formatTime';
import TableMenus from '../common/table-menus/TableMenus';

import Popover from '../libs/popover/Popover';
import MyDialog from '../common/my-dialog/MyDialog';
import CbSelectComp from '../common/form-items/cb-select/CbSelect';
import InputComp from '../common/form-items/input/Input';
import TimeComp from '../common/form-items/time/Time';
import BestRadio from '../common/form-items/best-ratio/BestRadio';

const tableMenus = [
  {type: 'all', text: '全部状态'},
  {type: 'ongoing', text: '出货中'},
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
    this.getOnlineState();
    this.getList();
  }

  getOnlineState() {
    const body = {
      game: 'dnf',
      goodsType: '游戏币',
    }
    axios.post('ElasticTraders/memStatus', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            // console.log(data);
            const { online } = data;
            this.setState({ selectedState: online ? '在线' : '离线'});
          }
        }
      ).catch(err => {});
  }

  getList() {
    const body = { 
      game: 'dnf',
      goodsType: '游戏币',
    };
    axios.post('ElasticTraders/mySells', body)
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
    const body = {
      game: 'dnf',
      goodsType: '游戏币',
    }
    axios.post('ElasticTraders/toggleOnline', body)
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
      return <span className="on">出货中(进入前三)</span>
    } else if ((mask == 0 || mask == 2) && top != 1) {
      return <span className="on">出货中(未进前三)</span>
    } else if (mask==1 || mask == 3) {
      return <span className="pause">已暂停</span>
    }
  }

  renderRows() {
    const { listFiltered } = this.state;
    if (!listFiltered) return;

    return listFiltered.map((item, idx) => {
      const { areaName, serverName, ratio, minNum, totalNum, mask, top, startH, endH } = item;
      return (
        <tr key={idx}>
          <td>{`${areaName}/${serverName}`}</td>
          <td>1元={ratio}</td>
          <td>{minNum}</td>
          <td>{totalNum}</td>
          <td>{this.getStatus(mask, top)}</td>
          <td>{(startH == 0 && endH == 0) ? '全天' : `${startH}}点 - ${endH}`}</td>
          <td>
            <button>修改</button>
            <button>暂停</button>
            <button>删除</button>
          </td>
        </tr>
      )
    });
  }

  handleAddShouhuo = () => {
    const { areaName, serverName } = this.state;
    if (!areaName || !serverName) return alert('请先选择区服');
    const body = { 
      game: 'dnf',
      goodsType: '游戏币',
      areaName, serverName
    };
    axios.post('ElasticTraders/eform', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            const controls = this.buildForm(data);
            this.setState({ showDialog: true, controls, form: data });
          }
        }
      ).catch(err => {});
  }

  hideDialog = () => {
    this.setState({ showDialog: false })
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

    axios.post('ElasticTraders/addd', { bundle })
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {

          } else if (error) {
            alert(error);
          }
        }
      ).catch(err => {});
  }

  render() {
    const { areaNames } = this.props;
    const { areaName, serverName, serverNames, selectedState, curMenu, showDialog } = this.state;

    return (
      <Container>
        <Nav>
          <Button theme="blue">出货配置</Button> 
          <Button theme="gray" onClick={this.viewTrend}>出货商走势</Button> 
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
              {selectedState === '离线' ? (<p className="status off">您的出货信息已隐藏，其它玩家不能下单。选择在线后恢复显示。</p>) : 
                (<p className="status">您的出货信息玩家可正常下单。选择离线后出货信息将会被隐藏。</p>)
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
                <th>出货比例</th>
                <th>最小出货量</th>
                <th>最大出货量</th>
                <th>状态</th>
                <th>开启时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
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
  areaNames: state.game.areaNames,
  serverList: state.game.serverList,
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Finace)
