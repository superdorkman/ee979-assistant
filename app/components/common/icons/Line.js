import React from 'react';

const Line = props => {

  return (
    <svg viewBox="0 0 42 42" {...props}>
      <path d="M0 20h42v2H0z"/>
    </svg>
  )
}

Line.defaultProps = {
  width: 12,
  height: 12,
}

export default Line;