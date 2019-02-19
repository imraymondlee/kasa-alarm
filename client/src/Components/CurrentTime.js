import React, { Component } from 'react';

class CurrentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  
  render() {
    return (
      <div>
        <h1>{this.state.time}</h1>
      </div>
    );
  }
}

export default CurrentTime;


