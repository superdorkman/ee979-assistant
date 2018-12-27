import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openToast } from '../../../../actions';
import { Wrapper, SelectWrap, Select, Divider, List, Item } from './Time.styled';
import Label from '../label/Label';
import Popup from '../../../libs/popup/Popup';

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];

export class TimeComp extends Component {

  state = {
    value: this.props.value || '',
    selecting: '',
    startHours: ['全天交易', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'
    , '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'],
    endHours: [],
    items: [],
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

  handleSelect(type) {
    const { selectedStart } = this.state;
    if (type === 'end' && !selectedStart) {
      return this.props.openToast('请先选择起始时间');
    }
    this.setState({ 
      selecting: type,
      items: this.state[`${type}Hours`]
    });
  }

  startAllDay() {
    this.setState({
      selectedStart: '全天交易',
      selecting: '',
      allDay: true
    });

    this.props.onChange('startH', 0);
    this.props.onChange('endH', 0);
  }

  handleItemClick(item) {
    const { selecting, startHours } = this.state;
    if (selecting === 'start') {
      if (item === '全天交易') {
        this.startAllDay();
      } else {
        const startH = parseInt(item.split(':')[0]);
        const endHours = hours.slice(startH + 1).map(v => v > 9 ? `${v}:00` : `0${v}:00`);
        this.setState({ selecting: '', selectedStart: item, endHours, allDay: false });
        this.props.onChange('startH', startH);
      }
    } else if (selecting === 'end') {
      const endH = parseInt(item.split(':')[0]);
      this.setState({ selecting: '', selectedEnd: item });
      this.props.onChange('endH', endH);
    }
  }

  dismiss = () => {
    this.setState({ selecting: '' });
  }

  renderItems() {
    const { items } = this.state;
    return items.map((item, idx) => (
      <Item key={idx} onClick={() => this.handleItemClick(item)}>{ item }</Item>
    ));
  }

  render() {
    const { allDay, selecting, selectedStart, selectedEnd } = this.state;
    const { label, required } = this.props;

    return (
      <Wrapper>
        <Label text={label} isMust={required} />
        <SelectWrap>
          <Select solid={!!selectedStart} onClick={() => this.handleSelect('start')}>{selectedStart || '请选择'}</Select>
          {!allDay && (
            <React.Fragment>
              <Divider></Divider>
              <Select solid={!!selectedEnd} onClick={() => this.handleSelect('end')}>{selectedEnd || '请选择'}</Select>
            </React.Fragment>
          )}
        </SelectWrap>

        <Popup show={!!selecting} dismiss={this.dismiss}>
          <List>
            {this.renderItems()}
          </List>
        </Popup>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openToast: (text) => dispatch(openToast(text))
})

export default connect(null, mapDispatchToProps)(TimeComp);
