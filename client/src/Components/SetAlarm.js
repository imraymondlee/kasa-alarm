import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class SetAlarm extends Component {
  constructor() {
    super();
    this.state = {
      date : '',
      time: '',
      redirect: false
    };
  }
  
  onChangeDate = (e) => {
    this.setState({
      date: e.target.value
    });
  }

  onChangeTime = (e) => {
    this.setState({
      time: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let dateTime = this.state.date + ' ' + this.state.time;
    let formattedDate = moment(dateTime, 'YYYY-MM-DD HH:mm').format("M/D/YYYY, h:mm:ss A");
    this.props.submitAlarm(formattedDate);
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <Box mb={2}>
        <Typography variant="h5" align="center">
          <strong>New Alarm</strong>
        </Typography>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="date" style={{display: 'block', fontWeight: '600', color: '#0890a8', marginTop: '2rem'}}>Date</label>
          <TextField
            id="date"
            type="date"
            fullWidth={true}
            margin="normal"
            onChange={this.onChangeDate} 
            value={this.state.date}
          />
          <label htmlFor="time"  style={{display: 'block', fontWeight: '600', color: '#0890a8', marginTop: '2rem'}}>Time</label>
          <TextField
            id="time"
            type="time"
            fullWidth={true}
            margin="normal"
            onChange={this.onChangeTime} 
            value={this.state.time}
            style={{marginBottom: '2rem'}}
          />

          {this.props.currentAlarmTime === 'No alarms have been set.' || this.props.currentAlarmTime === 'Invalid date' ? (
            <Button type="submit" variant="contained" color="primary" fullWidth={true}>
              Set Alarm
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth={true} disabled>
              Set Alarm
            </Button>
          )}
         {this.renderRedirect()}
        </form>
      </Box>
    );
  }
}

export default SetAlarm;