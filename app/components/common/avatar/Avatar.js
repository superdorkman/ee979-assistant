import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lazyload from '../../libs/lazyload/Lazyload';

export class Avatar extends Component {
  static propTypes = {

  }

  render() {
    const { size, src, theme } = this.props;
    const style = {
      ...styles.wrap,
      width: size,
      height: size
    }

    return (
      <div style={style} >
        {src ? (
          <Lazyload src={src} isAvatar={true} />
        ) : (
          <svg viewBox="0 0 40 40">
            <circle cx="20" cy="14" r="8" fill="#fff" />
            <circle cx="20" cy="54" r="28" fill="#fff" />
          </svg>
        )}
      </div>
    )
  }
}

Avatar.defaultProps = {
  size: 80,
}

const styles = {};

styles.wrap = {
  display: 'inline-block',
  border: '2px solid #fff',
  borderRadius: '50%',
  overflow: 'hidden',
  boxShadow: '0 3px 8px rgba(0,0,0,.6)',
}


export default Avatar;
