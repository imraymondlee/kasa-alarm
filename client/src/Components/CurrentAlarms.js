import React, { Component } from 'react';
import axios from 'axios';
// import moment from 'moment';

class CurrentAlarms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlarms: ''
    };
  }

  componentDidMount () {
    axios.get('http://localhost:8000/show-alarms')
      .then((response) => {

        this.setState({
          currentAlarms: response.data
        });
        console.log('Response: ' + response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAlarm = () => {
    console.log(this.state.currentAlarms);


    axios.post('http://localhost:8000/delete-alarm', {
      currentAlarms: this.state.currentAlarms
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });

    this.setState({
      currentAlarms: 'No alarms have been set.'
    })

  }


  render() {


    return (
      <div>
        <h1>Current Alarm:</h1>
        <p> {this.state.currentAlarms}</p>

        {this.state.currentAlarms != 'No alarms have been set.' &&
          <button onClick={this.deleteAlarm}>Clear Alarm</button>
        }
      </div>
    );
  }
}

export default CurrentAlarms;

