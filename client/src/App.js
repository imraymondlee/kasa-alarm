import React, { Component } from 'react';
import axios from 'axios';
import CurrentTime from './Components/CurrentTime';
import SetAlarm from './Components/SetAlarm';
import CurrentAlarms from './Components/CurrentAlarms';
import './App.css';

class App extends Component {
  constructor() { 
    super();
    this.state = {
      currentAlarmTime : 'No alarms have been set.'
    };
  }

  componentDidMount () {
    axios.get('/show-alarms')
      .then((response) => {
        this.setState({
          currentAlarmTime: response.data
        });
        console.log('Response: ' + response.data);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          status: 'Cannot connect to server.'
        });
      });
  }

  submitAlarm = (formattedDate) => {
    console.log(formattedDate);
    axios.post('/set-alarm', {
      endAlarmTime: formattedDate
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

    this.setState({
      currentAlarmTime: formattedDate
    })
  }

  deleteAlarm = (deleteAlarmTime) => {
    axios.post('/delete-alarm', {
      deleteAlarm: deleteAlarmTime
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

    this.setState({
      currentAlarmTime: 'No alarms have been set.'
    })
  }

  render() {
    let status = <h1>{this.state.status}</h1>;

    return (
      <div className="App">
        {status}
        <CurrentTime/>
        <SetAlarm submitAlarm={this.submitAlarm} currentAlarmTime={this.state.currentAlarmTime}/>
        <CurrentAlarms currentAlarmTime={this.state.currentAlarmTime} deleteAlarm={this.deleteAlarm}/>
      </div>
    );
  }
}

export default App;
