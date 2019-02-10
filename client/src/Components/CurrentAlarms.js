import React, { Component } from 'react';
import axios from 'axios';

class CurrentAlarms extends Component {


  render() {
    return (
      <div>
        <h1>Current Alarm:</h1>
        <p> {this.props.currentAlarmTime}</p>

        {this.props.currentAlarmTime != 'No alarms have been set.' &&
          <button onClick={() => this.props.deleteAlarm(this.props.currentAlarmTime)}>Clear Alarm</button>
        }
      </div>
    );
  }
}

export default CurrentAlarms;

