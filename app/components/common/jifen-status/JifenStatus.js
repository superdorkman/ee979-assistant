import React, { Component } from 'react';

const statusList = [
  {name: '财神再现', jifen: 1000000, src: require('../../../assets/images/jifen/s9.png')},
  {name: '富可敌国', jifen: 500000, src: require('../../../assets/images/jifen/s8.png')},
  {name: '富甲一方', jifen: 250000, src: require('../../../assets/images/jifen/s7.png')},
  {name: '挥金如土', jifen: 100000, src: require('../../../assets/images/jifen/s6.png')},
  {name: '腰缠万贯', jifen: 30000, src: require('../../../assets/images/jifen/s5.png')},
  {name: '一掷千金', jifen: 15000, src: require('../../../assets/images/jifen/s4.png')},
  {name: '穿金戴银', jifen: 3000, src: require('../../../assets/images/jifen/s3.png')},
  {name: '衣食无忧', jifen: 1000, src: require('../../../assets/images/jifen/s2.png')},
  {name: '无名之辈', jifen: 0, src: require('../../../assets/images/jifen/s1.png')},
];

class Jifen extends Component {

  state = {
    curStatus: '',
  }

  getImg(jifen) {
    let idx = 0;

    if (jifen < 1000) {
      idx = 8;
    } else if (jifen >= 1000 && jifen < 3000) {
      idx = 7;
    } else if (jifen >= 3000 && jifen < 15000) {
      idx = 6;
    } else if (jifen >= 15000 && jifen < 30000) {
      idx = 5;
    } else if (jifen >= 30000 && jifen < 100000) {
      idx = 4;
    } else if (jifen >= 100000 && jifen < 250000) {
      idx = 3;
    } else if (jifen >= 250000 && jifen < 500000) {
      idx = 2;
    } else if (jifen >= 500000 && jifen < 1000000) {
      idx = 1;
    } else if (jifen >= 1000000) {
      idx = 0;
    }

    return statusList[idx].src;
  }

  render() {
    const { jifen } = this.props;
    if (!jifen) return null;

    return (
      <img src={this.getImg(jifen)} />
    )
  }
}

export default Jifen;