import React, { Component } from 'react';
import CurrentTime from './Components/CurrentTime';
import SetAlarm from './Components/SetAlarm';
import CurrentAlarms from './Components/CurrentAlarms';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <CurrentTime />
        <SetAlarm />
        <CurrentAlarms />

      </div>
    );
  }
}

export default App;
