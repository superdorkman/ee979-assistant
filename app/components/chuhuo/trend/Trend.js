import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Nav, Content, Filter } from './Trend.styled';
import Button from '../../libs/button/Button';
import SectionHeader from '../../common/section-header/SectionHeader';

import Select from '../../libs/select/Select';
import axios from 'axios';
import { toFixed } from '../../../utils/helper';
// import formatTime from '../../../utils/formatTime';
// import TableMenus from '../../../common/table-menus/TableMenus';

export class Trend extends Component {

  state = {
    list: null,
    selectedCross: '跨1'
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
    const body = { 
      game: 'dnf',
      goodsType: '游戏币',
      filter: {
        cross: `DNF${this.state.selectedCross}`,
      },
      page: 1,
      size: 10000,
    };
    axios.post('ElasticTraders/list', body)
      .then(
        res => {
          const { data, error } = res.data;
          if (data) {
            console.log(data);
            this.setState({ list: data });
          }
        }
      ).catch(err => {});
  }

  handleSelect = (option, index) => {
    this.setState({ selectedCross: option }, () => {
      this.getList();
    });
  }

  renderRows() {
    const { list } = this.state;
    if (!list) return;

    return list.map((item, idx) => {
      const { cross, character, totalNum, ratio, } = item;
      return (
        <tr key={idx}>
          <td>{cross}</td>
          <td>{character}</td>
          <td>{totalNum}</td>
          <td>{toFixed(1/ratio, 4)}</td>
          <td>{ratio}</td>
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

  goConfig = () => {
    const { history, match: { url }} = this.props;
    history.replace('/chuhuo');
  }

  render() {
    const { crossList } = this.props;
    const { selectedCross } = this.state;

    return (
      <Container>
        <Nav>
          <Button onClick={this.goConfig}>出货配置</Button> 
          <Button theme="blue">出货商走势</Button> 
        </Nav>
        <Content>
          <SectionHeader title="收货商走势" />

          <Filter>
            选跨区： <Select options={crossList} selected={selectedCross} onSelect={this.handleSelect} />
          </Filter>

          <table>
            <thead>
              <tr>
                <th>跨区</th>
                <th>出货商</th>
                <th>出货量</th>
                <th>万金单价</th>
                <th>每元比例</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </Content>

      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  crossList: state.game.crossList
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Trend)
