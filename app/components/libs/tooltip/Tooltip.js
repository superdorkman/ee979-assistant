import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../../constants/theme';

import { Wrapper } from './Tooltip.styled';

class Tooltip extends Component {

  render() {
    const { pos, text } = this.props;

    if (!text || !text.trim()) return null;

    return (
      <ThemeProvider theme={theme}>
        {text &&
        <Wrapper pos={pos}>
          <div className="two-liner">{ text }</div>
          <div className="pointer">
            <div className="inner"> 
              <div className="text">{ text }</div>
            </div>
          </div>
        </Wrapper>}
      </ThemeProvider>
    );
  }
}

Tooltip.defaultProps = {
  pos: 'top'
}

export default Tooltip;