import React, { Component } from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
          <Box mt={2} mb={3} textAlign="center">
            <Fab type="submit" color="primary" aria-label="Add" size="small">
              <AddIcon />
            </Fab>
          </Box>
        )}

      </form>
    );
  }
}

export default SetAlarm;

