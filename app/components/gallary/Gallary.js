import React, { Component } from 'react';
import { Container, CloseWrap, ImgWrap, Left, Right, Widgets, Count } from './Gallary.styled';
import Button from '../libs/button/Button';
import SectionHeader from '../common/section-header/SectionHeader';
import Close from '../common/icons/Close';
import ResizeArea from '../common/resize-area/ResizeArea';
import ChevronLeft from '../common/icons/ChevronLeft';
import Rotate from '../common/icons/Rotate';

const { ipcRenderer } = window.require('electron');

export class Gallary extends Component {

  state = {
    curImg: null,
    curIdx: 0,
    images: [],
    deg: 0,
  }

  componentWillMount() {
    const args = ipcRenderer.sendSync('gallary:images');
    this.setImages(args);
  }

  componentDidMount() {
    ipcRenderer.on('gallary:reopen', (event, images) => {
      this.setImages(images);
    });
  }

  setImages(args) {
    this.setState({ ...args }, () => {
      this.loadImg();
    });
  }

  loadImg() {
    const { images, curIdx } = this.state;
    const img = new Image();
    img.onload = () => {
      // console.log(img.width, img.height);
      this.setState({ curImg: img.src, deg: 0 });
      // ipcRenderer.send('gallary:resize', {width: img.width + 40, height: img.height + 40});
    }
    img.src = images[curIdx];
  }

  handleClose = () => {
    ipcRenderer.send('gallary:close');
  }

  handleLeftClick = () => {
    let { curIdx, images } = this.state;
    if (curIdx > 0) {
      curIdx--;
    } else {
      curIdx = images.length - 1;
    }

    this.setState({ curIdx });
  }

  handleRightClick = () => {
    let { curIdx, images } = this.state;
    if (curIdx < images.length - 1) {
      curIdx++;
    } else {
      curIdx = 0;
    }

    this.setState({ curIdx });
  }

  handleRotate = () => {
    this.setState({ deg: this.state.deg + 90 });
  }

  render() {
    const { curIdx, images, deg } = this.state;
    const style = {
      transform: `rotate(${deg}deg)`
    }

    return (
      <Container>
        <CloseWrap onClick={this.handleClose}>
          <Close fill="#fff" />
        </CloseWrap>
        <Left onClick={this.handleLeftClick}>
          <ChevronLeft fill="#fff" />
        </Left>
        <Right onClick={this.handleRightClick}>
          <ChevronLeft fill="#fff" />
        </Right>

        <Count>{curIdx + 1} / {images.length}</Count>

        <Widgets>
          <div onClick={this.handleRotate}>
            <Rotate />
          </div>
        </Widgets>
          <img src={images[curIdx]} style={style} />
        <ResizeArea />
      </Container>
    )
  }
}

export default Gallary;
