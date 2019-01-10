import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openSnack } from '../../../actions';
import { ThemeProvider } from 'styled-components';
import theme from '../../../constants/theme';

import { Wrapper } from './Snackbar.styled';

class Snackbar extends Component {

  state = {
    snack: ''
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { snack } = nextProps;
    if (snack && snack !== this.state.snack) {
      this.countdown();
    }
    this.setState({snack});
  }

  countdown() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    const { showSnack, timer } = this.props;
    this.timeout = setTimeout(() => {
      showSnack('');
    }, timer);
  }

  render() {
    const { snack } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Wrapper show={snack}>{ snack }</Wrapper>
      </ThemeProvider>
    );
  }
}

Snackbar.defaultProps = {
  timer: 3000
}

const mapStateToProps = (state) => ({
  snack: state.setting.snack
});

const mapDispatchToProps = (dispatch) => ({
  showSnack: (text) => dispatch(openSnack(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);