import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import Mask from '../mask/Mask';
import { Wrapper, Head, NavButton, Weekdays, Days, DayWrap, Day } from './DatePicker.styled';
import theme from '../../../constants/theme';
import imgPlay from '../../../assets/icons/play.svg';
import fastForwards from '../../../assets/icons/fast-backward.svg';

import { getDays } from '../../../utils/helper';

const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const weekdays = ['一', '二', '三', '四', '五', '六', '日'];


export default class DatePicker extends PureComponent {

  state = {
    curYear: null,
    curMonth: null,
    curDay: null,
    daysNow: null,
    daysPrev: null,
    daysNext: null,
    date: this.props.date
  };


  componentWillMount() {
    this.setDate();
  }

  setDate() {
    if (this.state.date) {
      this.recoverDate();
    } else {
      this.calDate();
    }
  }

  // 恢复时间
  recoverDate() {
    let { date } = this.state;
    const [year, month, day] = date.split('-');
    let curYear = year;
    let curMonth = month;
    let curDay = day;
    this.calDays({curMonth, curYear, curDay});
  }

  calDate() {
    let date = new Date();
    let curYear = date.getFullYear();
    let curMonth = date.getMonth() + 1;
    this.calDays({curMonth, curYear});
  }

  calDays({curMonth, curYear, curDay}) {
    let daysPrev, daysNext;
    if (curMonth > 1) {
      daysPrev = getDays(curYear, curMonth - 1);
    } else {
      daysPrev = getDays(curYear - 1, 12);
    }

    let daysNow = getDays(curYear, curMonth);

    if (curMonth < 12) {
      daysNext = getDays(curYear, curMonth + 1);
    } else {
      daysNext = getDays(curYear + 1, 1);
    }

    // 月初1号星期几
    let firstWD;
    if (curMonth === 1) {
      firstWD = new Date(curYear - 1, 12).getDay();
    } else {
      firstWD = new Date(curYear, curMonth - 1).getDay();
    }
    if (firstWD === 0) {
      daysPrev = daysPrev.slice(-6);
      daysNext = daysNext.slice(0, 36 - daysNow.length);
    } else {
      daysPrev = firstWD - 1 > 0 ? daysPrev.slice(1 - firstWD) : [];
      daysNext = 43 - daysNow.length - firstWD > 0 ? daysNext.slice(0, 43 - daysNow.length - firstWD) : [];
    }

    this.setState({
      curMonth,
      curYear,
      curDay,
      daysNow,
      daysPrev,
      daysNext
    });
    
  }

  changeMY(type) {
    let { curMonth, curYear } = this.state;
    switch (type) {
      case 'pm':
        if (curMonth > 1) {
          curMonth--;
        } else {
          curMonth = 12;
          curYear--;
        }
        break;
      case 'nm':
        if (curMonth < 12) {
          curMonth++;
        } else {
          curMonth = 1;
          curYear++;
        }
        break;
      case 'py':
        curYear--;
        break;
      case 'ny':
        curYear++;
        break;
      default:
        break;
    }

    this.calDays({
      curMonth,
      curYear
    });
  }

  handleMaskClick = () => {
    this.props.onDaySelect();
  }

  onDaySelected(day) {
    this.setState({curDay: day}, () => {
      const { curYear, curMonth, curDay } = this.state;
      this.props.onDaySelect(`${curYear}-${curMonth}-${curDay}`);
    });
  }

  renderWeekDays() {
    return weekdays.map((d, i) => (
      <li key={i}>{d}</li>
    )); 
  }

  renderDaysPrev() {
    const { daysPrev } = this.state;
    if (!daysPrev) return;
    return daysPrev.map((d, i) => (
      <DayWrap key={i} disabled={true}>{d}</DayWrap>
    ));
  }

  renderDaysNow() {
    const { daysNow, curDay } = this.state;
    if (!daysNow) return;
    return daysNow.map((d, i) => (
      <DayWrap key={i} onClick={() => this.onDaySelected(d)} >
        <Day active={d === curDay}>{d}</Day>
      </DayWrap>
    ));
  }

  renderDaysNext() {
    const { daysNext } = this.state;
    if (!daysNext) return;
    return daysNext.map((d, i) => (
      <DayWrap key={i} disabled={true}>{d}</DayWrap>
    ));
  }

  render() {
    const { curMonth, curYear } = this.state;
    const { show } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Mask show={show} onClick={this.handleMaskClick}/>
          <Wrapper show={show}>
            <Head>
              <div>
                <NavButton reverse={true} onClick={() => this.changeMY('pm')}><img src={imgPlay} /></NavButton>
                <NavButton onClick={() => this.changeMY('py')}><img src={fastForwards} /></NavButton>
              </div>
              <div>
                <span>{months[curMonth - 1]}</span>
                <span>{curYear}</span>
              </div>
              <div>
                <NavButton reverse={true} onClick={() => this.changeMY('ny')}><img src={fastForwards} /></NavButton>
                <NavButton onClick={() => this.changeMY('nm')}><img src={imgPlay} /></NavButton>
              </div>
            </Head>

            <Weekdays>
              {this.renderWeekDays()}
            </Weekdays>

            <Days>
              {this.renderDaysPrev()}
              {this.renderDaysNow()}
              {this.renderDaysNext()}
            </Days>
          </Wrapper>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
