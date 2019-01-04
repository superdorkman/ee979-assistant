import React from 'react';

const OrdersIcon = props => {

  return (
    <svg viewBox="0 0 1024 1024" {...props}>
      <path d="M853.333 0H682.667v128A42.667 42.667 0 0 1 640 170.667H384A42.667 42.667 0 0 1 341.333 128V0H170.667a85.333 85.333 0 0 0-85.334 85.333v853.334A85.333 85.333 0 0 0 170.667 1024h682.666a85.333 85.333 0 0 0 85.334-85.333V85.333A85.333 85.333 0 0 0 853.333 0zm0 938.667H170.667V85.333H256V128a128 128 0 0 0 128 128h256a128 128 0 0 0 128-128V85.333h85.333z"/>
      <path d="M469.333 85.333h85.334a42.667 42.667 0 0 0 42.666-42.666A42.667 42.667 0 0 0 554.667 0h-85.334a42.667 42.667 0 0 0-42.666 42.667 42.667 42.667 0 0 0 42.666 42.666zm256 256H298.667A42.667 42.667 0 0 0 256 384a42.667 42.667 0 0 0 42.667 42.667h426.666A42.667 42.667 0 0 0 768 384a42.667 42.667 0 0 0-42.667-42.667zM640 512H298.667A42.667 42.667 0 0 0 256 554.667a42.667 42.667 0 0 0 42.667 42.666H640a42.667 42.667 0 0 0 42.667-42.666A42.667 42.667 0 0 0 640 512zm-85.333 170.667h-256A42.667 42.667 0 0 0 256 725.333 42.667 42.667 0 0 0 298.667 768h256a42.667 42.667 0 0 0 42.666-42.667 42.667 42.667 0 0 0-42.666-42.666z"/>
    </svg>
  )
}

OrdersIcon.defaultProps = {
  width: 14,
  height: 14,
}

export default OrdersIcon;