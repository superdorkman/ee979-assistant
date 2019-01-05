import React, { Component } from 'react';
import { Wrapper, SelectWrap, Divider } from './Time.styled';

import Label from '../label/Label';
import Select from '../../../libs/select/Select';

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];

export class TimeComp extends Component {

  state = {
    value: this.props.value || '',
    startHours: ['全天交易', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'
    , '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'],
    endHours: [],
    selectedStart: null,
    selectedEnd: null,
    allDay: false,
  }

  componentWillMount() {
    const { value1, value2 } = this.props;
    if (value1 === 0 && value2 === 0) {
      this.setState({ selectedStart: '全天交易', allDay: true });
      this.props.onChange('startH', 0);
      this.props.onChange('endH', 0);
    } else {
      const selectedStart = value1 != null ? `${this.padLeft(value1)}:00` : '';
      const selectedEnd = value2 != null ? `${this.padLeft(value2)}:00` : '';
      const endHours = hours.slice(value1 + 1).map(v => v > 9 ? `${v}:00` : `0${v}:00`);
      this.props.onChange('startH', value1);
      this.props.onChange('endH', value2);
      this.setState({ selectedStart, selectedEnd, endHours });
    }
  }

  padLeft(v) {
    return v > 9 ? v : `0${v}`;
  }

  handleSelect = (option, idx, ki) => {
    if (ki === 'start') {
      if (option === '全天交易') {
        this.startAllDay();
      } else {
        const startH = parseInt(option.split(':')[0]);
        const endHours = hours.slice(startH + 1).map(v => v > 9 ? `${v}:00` : `0${v}:00`);
        this.setState({ selectedStart: option, endHours, allDay: false });
        this.props.onChange('startH', startH);
      }
    } else if (ki === 'end') {
      this.setState({ selectedEnd: option });
      this.props.onChange('startH', startH);
    }
  }

  startAllDay() {
    this.setState({
      selectedStart: '全天交易',
      allDay: true
    });

    // this.props.onChange('startH', 0);
    // this.props.onChange('endH', 0);
  }

  render() {
    const { allDay, selecting, selectedStart, selectedEnd, startHours, endHours } = this.state;
    const { label, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required} />
        <SelectWrap>
          <Select ki="start" options={startHours} selected={selectedStart} onSelect={this.handleSelect}
            width={120} height={30} />
          {!allDay && (
            <React.Fragment>
              <Divider></Divider>
              <Select ki="end" options={endHours} selected={selectedEnd} onSelect={this.handleSelect} 
              width={120} height={30}/>
            </React.Fragment>
          )}
        </SelectWrap>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // openToast: (text) => dispatch(openToast(text))
})

export default TimeComp;
