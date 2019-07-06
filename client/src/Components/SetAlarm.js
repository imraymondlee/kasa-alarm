import React, { Component } from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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

        <TextField
          id="date-time"
          type="datetime-local"
          fullWidth={true}
          margin="normal"
          onChange={this.onChange} 
          value={this.dateTime}
        />
        <br />
        {this.props.currentAlarmTime !== 'No alarms have been set.' ? (
          <Button type="submit" variant="contained" color="primary" fullWidth={true} disabled>
            Set Alarm
          </Button>
        ) : (
          <Button type="submit" variant="contained" fullWidth={true} color="primary">
            Set Alarm
          </Button>
        )}

      </form>
    );
  }
}

export default SetAlarm;

