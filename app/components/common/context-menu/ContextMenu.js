import React, { Component } from 'react';
import { Wrapper } from './ContextMenu.styled';
import { connect } from 'react-redux';

class ContextMenu extends Component {

  componentWillMount() {
    // console.log(this.props.contextMenu)
  }
  
  render() {
    return (
      <Wrapper>
        
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  contextMenu: state.setting.contextMenu
});

export default connect(mapStateToProps)(ContextMenu);