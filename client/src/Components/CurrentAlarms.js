import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class CurrentAlarms extends Component {


  render() {
    return (
      <div>
        <h1>Current Alarm</h1>
        <p> {this.props.currentAlarmTime}</p>

        {this.props.currentAlarmTime != 'No alarms have been set.' &&
          <Button onClick={() => this.props.deleteAlarm(this.props.currentAlarmTime)}
            variant="contained" 
            fullWidth={true} 
            color="secondary">
              Clear Alarms
          </Button>
        }
      </div>
    );
  }
}

export default CurrentAlarms;

