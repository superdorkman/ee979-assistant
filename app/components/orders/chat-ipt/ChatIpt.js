import React, { Component } from 'react';
import { connect } from 'react-redux';
import svgIcons from '../../../assets/icons/icons.svg';
import { Container, TopWidgets, EmojiHodler, IptWrap, SubmitBtn } from './ChatIpt.styled';
import Emojis from '../../common/emoji/Emoji';

import qqFaces from '../../../assets/icons/qq-faces.png';
import emoji from '../../../assets/icons/emoji.png';
// import MsgTemplates from '../../msg-templates/MsgTemplates';
import axios from 'axios';
import { API_URL } from '../../../constants/url';
import { getOssKey, uploadImg } from '../../../services/oss';
import Emoji from '../../common/icons/Emoji';
import Photo from '../../common/icons/Photo';
import { openSnack } from '../../../services/SnackbarService';
const { clipboard, ipcRenderer } = window.require('electron');

export class ChatIpt extends Component {

  state = {
    showEmoji: false,
    showTemplates: false,
  }

  componentWillMount() {
    // console.log(clipboard.readImage())
  }

  componentDidMount() {
    this.iptBox.addEventListener('dragenter', this.listenForDragEnter, false);
    this.iptBox.addEventListener('dragover', this.listenForDragOver, false);
    this.iptBox.addEventListener('dragleave', this.listenForDragLeave, false);
    this.iptBox.addEventListener('drop', this.listenForDrop, false);
    this.iptBox.addEventListener('paste', this.listenForPasting, false);
  }

  // listening for paste
  listenForDragEnter = e => {
    e.stopPropagation(); 
    e.preventDefault();
    this.dragover = true;
  }

  listenForDragOver = e => {
    e.stopPropagation(); 
    e.preventDefault();
  }

  listenForDragLeave = e => {
    e.stopPropagation(); 
    e.preventDefault();
    this.dragover = false;
  }

  listenForDrop = e =>{
    e.stopPropagation(); 
    e.preventDefault(); 
    this.dragover = false;
    var imageFile = e.dataTransfer.files[0];
    this.processFile(imageFile);
  }

  processFile(file) {
    var fileReader = new FileReader();
    fileReader.onload = () => {
      let img = new Image();
      img.src = fileReader.result.toString();
      img.onload = () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        this.doUpload(canvas);
      }
    };
    fileReader.readAsDataURL(file);
  }

  listenForPasting = e => {
    for (var i = 0; i < e.clipboardData.items.length; i++) {
      let { kind, type } = e.clipboardData.items[i];
      if (kind === "file" && /image\//.test(type)) {
        e.preventDefault();
        var imageFile = e.clipboardData.items[i].getAsFile();
        this.processFile(imageFile);
        break;
      }
    }

  }

  dataURItoBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURIComponent(dataURI.split(',')[1]);
    }
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  doUpload(canvas) {
    if (canvas.toBlob) {
      canvas.toBlob(blob => this.upload(null, blob));
    } else {
      let dataURL = canvas.toDataURL('image/png', 1);
      let blob = this.dataURItoBlob(dataURL);
      this.upload(null, blob);
    }
  }

  async upload(img = null, blob = null) {
    const tokenRes = await getOssKey();
    if (!tokenRes.data.data) return;
    const fileRes = await uploadImg(tokenRes.data.data, img, blob);
    if (!fileRes.data.data) return;
    const filename = fileRes.data.data.filename;
    this.wrapImage(filename);
  }

  wrapImage(img) {
    const imgTag = `<img title src="${img}" style="max-width:100%; height:94px">`;
    this.iptBox.innerHTML += imgTag;
    // this.input = this.iptBox.innerHTML;
  }
  // end of listening

  handleMouseDown = (e) => {
    if (e.button !== 2) return;
  }

  handleWidgetClick(type) {
    switch (type) {
      case 'emoji':
        this.toggleShowEmoji();
        break;
    }
  }

  toggleShowEmoji() {
    this.setState({ showEmoji: !this.state.showEmoji });
  }

  dismissEmojiModal = () => {
    this.setState({ showEmoji: false });
  }

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    let ipt = this.iptBox.innerHTML.trim();
    if (!ipt) {
      return;
    }

    const reg = /<img title[^>]*>/;
    let msgs = [];

    if (!reg.test(ipt)) {
      this.sendMsg(this.wrapMsg(ipt, false));
    } else {
      while (ipt.match(reg)) {
        let index = ipt.match(reg).index;
        if (index !== 0) {
          let tmp = ipt.slice(0, index);
          ipt = ipt.slice(index);
          msgs.push(this.wrapMsg(tmp, false));
        } else {
          let tmp = ipt.slice(0, ipt.match(reg)[0].length);
          ipt = ipt.slice(ipt.match(reg)[0].length);
          msgs.push({
            msg: tmp,
            imgOnly: true,
            src: tmp.replace(/.*src="(.*)" .*/, '$1'),
            created: new Date()
          });
        }
      }

      if (ipt === '<br>') {
        return openSnack('发送失败，请将发送内容截图反馈给客服，谢谢各种');
      }

      if (ipt) {
        msgs.push(this.wrapMsg(ipt, false));
      }

      // console.log(msgs)
      msgs.forEach(msg => this.sendMsg(msg));

    }

  }

  wrapMsg(msg, imgOnly = false) {
    return {
      msg,
      imgOnly,
      created: new Date()
    };
  }

  sendMsg(msg) {
    const { orderSN, targetSN } = this.props;
    const body = {orderSN, body: msg, to: targetSN};
    axios.post('Ims/send', body)
      .then(res => {
        const { data, error } = res.data;
        if (data) {
          this.props.onSending(msg);
        } else if (error) {
          openSnack(error);
        }
        // this.setState({ ipt: '' });
        this.iptBox.innerHTML = '';
      }).catch(err => {})
  }

  // 添加表情
  onEmojiSelect = (type, item) => {
    var img = new Image();
    img.width = 28;
    img.height = 28;
    img.src = 'https://wx.qq.com/zh_CN/htmledition/v2/images/spacer.gif';
    img.style.cssText = `
      vertical-align: middle;
      background-image: url(${type === 'qq' ? qqFaces : emoji});
      background-position: ${item.pos};
    `;
    this.dismissEmojiModal();
    this.iptBox.appendChild(img);
  }

  handleFileChange = async (e) => {
    const tokenRes = await getOssKey();
    if (!tokenRes.data.data) return this.file.value = null;
    const fileRes = await uploadImg(tokenRes.data.data, this.file);
    if (!fileRes.data.data) return this.file.value = null;
    const filename = fileRes.data.data.filename;
    this.wrapImage(filename);
    // const msgWrap = this.wrapImg(filename);
    // this.sendMsg(msgWrap);
  }

  wrapImg(img) {
    const imgTag = `<img title src="${img}" style="max-width:100%; height:30vw">`;
    return {
      msg: imgTag,
      imgOnly: true,
      src: img,
      created: new Date()
    }
  }

  dataURItoBlob(dataURI) {
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURIComponent(dataURI.split(',')[1]);
    }
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  doUpload(canvas) {
    if (canvas.toBlob) {
      canvas.toBlob(blob => this.upload(null, blob));
    } else {
      let dataURL = canvas.toDataURL('image/png', 1);
      let blob = this.dataURItoBlob(dataURL);
      this.upload(null, blob);
    }
  }

  onToggleTpl = () => {
    this.setState({ showTemplates: !this.state.showTemplates });
  }

  _onTplclick = (tpl) => {
    this.iptBox.innerHTML = tpl;
    this.setState({ showTemplates: false });
  }

  render() {
    const { showEmoji, showTemplates } = this.state;

    return (
      <Container onMouseDown={this.handleMouseDown}>
        <TopWidgets>
          <EmojiHodler className={showEmoji ? 'show' : ''} onClickOutside={this.dismissEmojiModal}>
            <Emojis onSelect={this.onEmojiSelect}/>
          </EmojiHodler>
          <div className="left">
            <div className="icon" onClick={() => this.handleWidgetClick('emoji')}>
              <Emoji />
            </div>
            <label className="icon">
              <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" className="file" ref={ref => this.file = ref} 
              onChange={this.handleFileChange}/>
              <Photo />
            </label>
          </div>
          {/* <div className="right">
            <div className="icon" onClick={this.onToggleTpl}>
            </div>
          </div> */}
        </TopWidgets>

        <IptWrap>
          <pre contentEditable="true" ref={ref => this.iptBox = ref}
            onKeyDown={this.handleKeyDown}
          ></pre>
          <SubmitBtn onClick={this.handleSubmit}>发送</SubmitBtn>
        </IptWrap>

        {/* <MsgTemplates show={showTemplates} dismiss={this.onToggleTpl} onTplclick={this._onTplclick}/> */}
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  // memberSN: state.app.memberSN
});

export default connect(mapStateToProps)(ChatIpt);