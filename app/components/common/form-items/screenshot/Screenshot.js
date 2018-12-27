import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openToast } from '../../../../actions';
import { Wrapper, Images, ImgWrap, LoadingWrap, CrossWrap } from './Screenshot.styled';
import Label from '../label/Label';
import Loading from '../../../libs/loading/Loading';
import { Cross } from '../../../libs/icons';
import { getOssKey, uploadImg } from '../../../../services/oss';


export class Screenshot extends Component {

  state = {
    imgs: ['', '', ''],
    curFrame: null,
    isLoading: false,
  }

  componentWillMount() {
    const { value } = this.props;
    if (value) {
      let imgs = value.split(';');
      while (imgs.length < 3) {
        imgs.push('');
      }
      this.setState({ imgs });
    }
  }

  async handleChange(e, idx) {
    e.persist();
    if (!e.target.value) return;

    this.setState({ curFrame: idx, isLoading: true });

    const tokenRes = await getOssKey();
    if (!tokenRes.data.data) return e.target.value = null;
    const fileRes = await uploadImg(tokenRes.data.data, e.target);
    if (!fileRes.data.data) return e.target.value = null;
    const filename = fileRes.data.data.filename;

    const { imgs } = this.state;
    imgs[idx] = filename;
    const solidImgs = imgs.filter(v => v);
    if (solidImgs.length === imgs.length) {
      imgs.push('');
    }
    this.setState({ imgs, isLoading: false, curFrame: null });
    this.syncImgs(solidImgs);
    e.target.value = null;
  }

  syncImgs(imgs) {
    const { ki, onChange } = this.props;
    onChange(ki, imgs.join(';'));
  }

  handleDel(e, index) {
    e.stopPropagation();
    e.preventDefault();
    let { imgs } = this.state;
    if (imgs.length > 3) {
      imgs.splice(index, 1);
    } else {
      imgs[index] = '';
    }
    
    this.setState({ imgs });
  }


  renderImgs() {
    const { imgs, isLoading, curFrame } = this.state;
    return imgs.map((img, idx) => (
      <ImgWrap key={idx}>
        <input onChange={(e) => this.handleChange(e, idx)} type="file"/>
        {isLoading && curFrame === idx && <LoadingWrap><Loading name="circle" /></LoadingWrap>}
        {img && (
          <React.Fragment>
            <img src={`${img}?x-oss-process=image/resize,w_128/quality,Q_80`} />
            <CrossWrap onClick={(e) => this.handleDel(e, idx)}><Cross fill="#fff" /></CrossWrap>
          </React.Fragment>
        )}
      </ImgWrap>
    ));
  }


  render() {
    const { imgs } = this.state;
    const { required } = this.props;

    return (
      <Wrapper>
        <Label text="上传截图" isMust={required} />
        {imgs.length > 0 && (
          <Images>
            {this.renderImgs()}
          </Images>
        )}
      </Wrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openToast: (text) => dispatch(openToast(text))
})

export default connect(null, mapDispatchToProps)(Screenshot);
