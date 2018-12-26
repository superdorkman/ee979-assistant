import React, { Component } from 'react'

const { ipcRenderer } = window.require('electron');

function renderStock(props) {
  const { stock } = props;
  if (!stock) return;

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
    <table>
      <thead>
        <tr>
          <th>跨区</th>
          <th>仓库剩余金币（万金）</th>
        </tr>
      </thead>
      <tbody>
        {renderStock(props)}
      </tbody>
    </table>
  )
}
