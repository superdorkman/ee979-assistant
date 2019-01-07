import React, { Component } from 'react';
import { Container } from './DateRange.styled';

import Select from '../../libs/select/Select';
import DatePicker from '../../libs/datepicker/DatePicker';
import formatTime from '../../../utils/formatTime';
import { getDateRange } from '../../../utils/date';

const dateTypes = ['默认', '今日', '7天', '30天', '自定义日期'];

class DateRange extends Component {

  state = {
    curType: this.props.selectedDate,
    startSelect: false,
    firstDate: '',
    lastDate: '',
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ curType: nextProps.selectedDate });
  }

  handleSelect = (option, idx, ki) => {
    this.setState({ curType: option}, () => {
      if (option !== '自定义日期') {
        this.setTime();
      }
    });
  }

  onFocus(type) {
    this.setState({ startSelect: type});
  }

  onDateSelected = (date) => {
    const { curType, startSelect } = this.state;
    this.setState({ startSelect: '', [`${startSelect}Date`]: date || this.state[`${startSelect}Date`] }, () => {
      const { firstDate, lastDate } = this.state;
      if (firstDate && lastDate) {
        this.props.emitDate(curType, {between: [firstDate, lastDate]});
      }
    });
  }

  setTime() {
    const { curType } = this.state;
    let created = '';
    if (curType === '默认') {
      // this.setState({ firstDate: '', lastDate: '', }, () => {
      //   this.props.emitDate('');
      // })
      
    } else if (curType === '今日') {
      let today = new Date().toLocaleDateString();
      let tomorrow = new Date(new Date().getTime() + 3600*24*1000).toLocaleDateString();
      created = { between: [today, tomorrow] };
    } else if (curType === '7天') {
      created = { between: getDateRange('l7') };
    } else if (curType === '30天') {
      created = { between: getDateRange('l30') };
    }

    this.props.emitDate(curType, created);
  }

  render() {
    const { label } = this.props;
    const { startSelect, curType, firstDate, lastDate } = this.state;

    return (
      <Container>
        <span className="label">{label}: </span>
        <Select selected={curType}
          options={dateTypes} 
          onSelect={this.handleSelect} />

        {curType === '自定义日期' && (
          <div className="custome-date">
            <button className="picker" onClick={() => this.onFocus('first')}>
              { firstDate ? firstDate : '起始日期' }
            </button>

            <button className="picker" onClick={() => this.onFocus('last')}>
              { lastDate ? lastDate : '终止日期' }
            </button>

            {!!startSelect && (
              <div className="picker-wrap">
                <DatePicker onDaySelect={this.onDateSelected} date={this.state[`${startSelect}Date`]} show={true}/>
              </div>
            )}            
          </div>
        )}
      </Container>
    )
  }
}

DateRange.defaultProps = {
  label: '选择日期',
}

export default DateRange;