import React, { Component } from 'react';

import { Redirect } from 'react-router-dom'

import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class SetAlarm extends Component {

  constructor() {
    super();
    this.state = {
      dateTime : '',
      redirect: false
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
            <Button type="submit" variant="contained" color="primary" fullWidth={true}>
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

