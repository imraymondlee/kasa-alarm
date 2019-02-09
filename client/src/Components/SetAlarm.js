import React, { Component } from 'react';
import axios from 'axios';
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
    const data = this.state;
    // console.log(data.dateTime);
    let date = data.dateTime
    let formattedDate = moment(date, moment.HTML5_FMT.DATETIME_LOCAL).format("M/D/YYYY, h:mm:ss A");
    console.log(formattedDate);

    axios.post('http://localhost:8000/set-alarm', {
      endAlarmTime: formattedDate
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input id="date-time" type="datetime-local" onChange={this.onChange} value={this.dateTime} />

        <input type="submit" value="Set Alarm" />
      </form>
    );
  }
}

export default SetAlarm;

