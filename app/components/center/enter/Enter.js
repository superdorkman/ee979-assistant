import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Container, List } from './Enter.styled';
import SectionHeader from '../../common/section-header/SectionHeader';
const { ipcRenderer } = window.require('electron');

export class Center extends Component {

  state = {
    types: [
      {en: 'shipmentTrader', label: '商城收货', slogan: '设置游戏，收购比例，金牌展位', applied: false, deposit: null, url: '/service/help?catId=29&newsSN=NS2018052412119541'},
      {en: 'elasticTrader', label: '商城出货', slogan: '高曝光，高销量，黄金展位', applied: false, deposit: null, url: '/service/help?catId=29&newsSN=NS2018061182293731'},
      // {en: 'bzhTrader', label: 'DNF搬砖号', slogan: '高曝光，高销量，黄金展位', review: true, applied: false, deposit: null, url: '/service/help?catId=29&newsSN=NS2018061182293731'},
      {en: 'platinumTrader', label: '铂金商户', slogan: '尊贵标识，绿色通道', review: true, applied: false, deposit: null, url: '/service/help?catId=29&newsSN=NS2018061182293731'},
    ]
  }

  componentWillMount() {
    this.setTypes(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setTypes(nextProps);
  }

  setTypes(props) {
    const { myAllInfo } = props;
    let { types } = this.state;
    types = types.map((type) => {
      let datum = myAllInfo['sRole'][type.en];
      type.applied = !!datum;
      type.deposit = datum ? datum.yj : null;
      return type;
    });

    this.setState({ types });
  }

  handleNoticeClick(newsSN) {
    const url = `https://www.ee979.com/service/news/${newsSN}`;
    ipcRenderer.send('shell:openExternal', url);
  }

  handleExit(type) {
    const url = `https://www.ee979.com/personal/enter`;
    ipcRenderer.send('shell:openExternal', url);
  }

  renderTypes() {
    const { types } = this.state;
    return types.map((type, idx) => {
      const {en, label, slogan, applied, deposit, url} = type;

      return (
        <li key={en} className={applied ? 'done' : ''}>
          <h3>{ label }</h3>
          <h4>{ slogan }</h4>
          {applied ? (
            <div className="deposit">
              <span>押</span> 余额：{ deposit }元
            </div>
          ) : (
            <Fragment>
              <div className="deposit"></div>
              <div className="status">
                <a href={url} target="_blank">入驻协议</a>
                <button className="in" onClick={this.handleClick}>入驻</button>
              </div>
            </Fragment>
          )}

          {applied && (
            <div className="status">
              <h5>已入驻</h5>
              {en !== 'platinumTrader' && (
                <button onClick={() => this.handleExit(en)} className="out">退出</button>
              )}
            </div>
          )}
          
        </li>
      )
    })
  }

  render() {
    return (
      <Container>
        <SectionHeader title="入驻管理" />
        <List>
          {this.renderTypes()}
        </List>
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
