import React, { Component } from 'react';
import moment from 'moment';

class SetAlarm extends Component {

  constructor() {
    super();
    this.state = {
      dateTime : ''
    };
  }
  
  onChange = (e) => {
    this.setState({
      dateTime: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let date = this.state.dateTime
    let formattedDate = moment(date, moment.HTML5_FMT.DATETIME_LOCAL).format("M/D/YYYY, h:mm:ss A");
    this.props.submitAlarm(formattedDate);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input id="date-time" type="datetime-local" onChange={this.onChange} value={this.dateTime} />

        {this.props.currentAlarmTime != 'No alarms have been set.' ? (
          <input type="submit" value="Set Alarm" disabled/>
        ) : (
          <input type="submit" value="Set Alarm" />
        )}

      </form>
    );
  }
}

export default SetAlarm;

