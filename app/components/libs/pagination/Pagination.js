import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '../../../constants/theme';
import { Wrapper, PageInfo, PagerWrap, Pager } from './Pagination.styled';
import Ellipse from './Ellipse';
import Arrow from '../icons/Arrow';

const options = [
  '10条/页',
  '20条/页',
  '30条/页',
  '50条/页',
]

export default class Pagination extends Component {

  state = {
    pages: null,
    middleNums: [],
    hasEllipse: false,
    hasEllipseLeft: false,
    hasEllipseRight: false,
    curPage: this.props.page,
    sizeOption: options[0],
  }

  componentWillMount() {
    this.initPagers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { count, page } = nextProps;
    
    if (nextProps.count) {
      if (page < this.state.curPage) {
        this.setState({ curPage: page });
      }
      this.initPagers(nextProps);
    }
  }

  initPagers({ count, page: curPage, size }) {
    const pages = Math.ceil(count / size);
    let hasEllipse, hasEllipseLeft, hasEllipseRight, middleNums;
    if (pages >= 8) {
      hasEllipse = true;
      hasEllipseRight = true;

      if (curPage < 4) {
        middleNums = [2, 3, 4, 5]
      } else if (curPage < pages - 3) {
        middleNums = [curPage];
        middleNums.unshift(curPage - 1);
        middleNums.unshift(curPage - 2);
        middleNums.push(curPage + 1);
        middleNums.push(curPage + 2);
      } else {
        middleNums = [];
        middleNums.unshift(pages - 1);
        middleNums.unshift(pages - 2);
        middleNums.unshift(pages - 3);
        middleNums.unshift(pages - 4);
        hasEllipseRight = false;
      }
    } else {
      hasEllipse = false;
      hasEllipseRight = false;
      const arr = [];
      for (let i = pages - 1; i > 1; i--) {
        arr.unshift(i);
      }
      middleNums = arr;
    }

    if (curPage < 5) {
      hasEllipseLeft = false;
    } else {
      hasEllipseLeft = true;
    }

    this.setState({
      hasEllipse,
      hasEllipseLeft,
      hasEllipseRight,
      middleNums,
      pages,
      curPage
    })
  }

  renderPagers() {
    const { middleNums, curPage } = this.state;
    if (middleNums.length === 0) return;
    return middleNums.map((num, idx) => (
      <Pager key={idx} active={curPage === num}
        onClick={() => this.onPagerClick(num)}>{num}</Pager>
    ));
  }

  onPrev = () => {
    this.calculate(this.state.curPage - 1);
    this.props.onSelect(this.state.curPage - 1);
  }

  onPagerClick(page) {
    let { curPage } = this.state;
    if (page === 'left') {
      curPage -= 2;
    } else if (page === 'right') {
      curPage += 2;
    } else if (page === curPage) {
      return;
    } else {
      curPage = page;
    }
    this.calculate(curPage);
    this.props.onSelect(curPage);
  }

  onNext = () => {
    this.calculate(this.state.curPage + 1);
    this.props.onSelect(this.state.curPage + 1);
  }

  calculate(curPage) {
    const { hasEllipse, pages } = this.state;
    if (!hasEllipse) {
      return this.setState({ curPage });
    };

    let hasEllipseLeft, hasEllipseRight, middleNums;
    if (curPage < 5) {
      hasEllipseLeft = false;
      hasEllipseRight = true;
      middleNums = [2, 3, 4, 5];
    } else {
      hasEllipseLeft = true;
      hasEllipseRight = true;

      if (pages - curPage > 3) {
        middleNums = [curPage - 1, curPage, curPage + 1];
      } else {
        hasEllipseRight = false;
        middleNums = [pages - 4, pages - 3, pages - 2, pages - 1];
      }
    }

    this.setState({
      hasEllipseLeft,
      hasEllipseRight,
      middleNums,
      curPage
    });

  }

  handleSelect = (option, index) => {
    this.setState({
      sizeOption: option
    });
    this.props.onSizeChange(parseInt(option))
  }

  jumpTo = () => {
    const target = parseInt(this.refs.TargetPage.value);
    if(target > this.state.pages || target < 1) {
      alert("超出页数范围...");
      return false;
    }

    this.setState({
      curPage: target
    }, () => {
      this.calculate(target);
      this.props.onSelect(target);
    });
  }

  render() {
    const { count, page } = this.props;
    const { pages, curPage, hasEllipseLeft, hasEllipseRight, sizeOption } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          {/* 页数统计 */}
          {/* <PageInfo>
            {`共${count}条记录，第${page}/${totalPages}页`}
            &nbsp;&nbsp;
            <Select options={options}
              defaultOption={sizeOption}
              onSelect={this.handleSelect}
              width={100} height={30} left={0} />
          </PageInfo> */}

          {/* 分页 */}
          <PagerWrap>
            <Pager disabled={curPage === 1} onClick={this.onPrev}>
              <Arrow direction="left" />
            </Pager>
            <Pager active={curPage === 1} onClick={() => this.onPagerClick(1)}>1</Pager>
            {hasEllipseLeft && <Ellipse onClick={() => this.onPagerClick('left')} />}
            {this.renderPagers()}
            {hasEllipseRight && <Ellipse onClick={() => this.onPagerClick('right')} />}
            {pages > 1 && (<Pager active={curPage === pages}
              onClick={() => this.onPagerClick(pages)}>{pages}</Pager>)}
            <Pager disabled={curPage === pages} onClick={this.onNext}>
              <Arrow direction="right" />
            </Pager>
            <input className="jump_input" type="text" ref="TargetPage" />
            <button className="jump_button" onClick={() => {this.jumpTo()}}> 跳转 </button>
          </PagerWrap>
        </Wrapper>
      </ThemeProvider>
    )
  }
}

Pagination.propTypes = {
  hasEllipse: PropTypes.bool,
  hasEllipseLeft: PropTypes.bool,
  hasEllipseRight: PropTypes.bool,
}

Pagination.defaultProps = {
  page: 1,
  size: 10,
}