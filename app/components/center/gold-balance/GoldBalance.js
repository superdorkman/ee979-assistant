import React, { Component, Fragment } from 'react';
import Loading from '../../libs/loading/Loading';

const { ipcRenderer } = window.require('electron');

function renderStock(props) {
  const { stock } = props;

  return ['1','2','3a','3b','4','5','6','7','8'].map((cross, idx) => {
    const balance = stock[`cross_${cross}_stock`] || 0;
    return (
      <tr key={idx}>
        <td>跨{cross}</td>
        <td>{balance}万金</td>
      </tr>
    )
  })
}

export default props => {

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>跨区</th>
            <th>仓库剩余金币（万金）</th>
          </tr>
        </thead>
        {!!props.stock && (
          <tbody>
            {renderStock(props)}
          </tbody>
        )}
      </table>
      {!props.stock && (
        <div style={{flex: 1, display: 'flex', height: '80%', justifyContent: 'center', alignItems: 'center'}}>
          <Loading />
        </div>
      )}
    </Fragment>
  )
}
