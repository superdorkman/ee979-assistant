import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Wrapper } from './Popover.styled';
import Mask from '../mask/Mask';

export class Popover extends Component {
  render() {
    const { children, dismiss, isLocal, show } = this.props;

    return (
      <Fragment>
        <CSSTransition
          in={show}
          timeout={200}
          classNames="fade"
          unmountOnExit>
          <Mask onClick={dismiss} show={show} isLocal={isLocal} />
        </CSSTransition>
        <CSSTransition
          in={show}
          timeout={200}
          classNames="popup"
          unmountOnExit>
          <Wrapper>
            {children}
          </Wrapper>
        </CSSTransition>
      </Fragment>
    )
  }
}

Popover.defaultProps = {
  isLocal: false,
}

export default Popover;
