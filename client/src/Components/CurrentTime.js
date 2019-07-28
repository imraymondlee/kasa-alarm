import React, { Component } from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';

class CurrentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("MMMM Do YYYY"),
      time: moment().format("h:mm A")
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
    let date = moment().format("MMMM Do YYYY");
    let time = moment().format("h:mm A");

    this.setState({
      date: date,
      time: time
    });
  }
  
  render() {
    return (
      <div>
        <Typography variant="body1" align="center">
          <strong>{this.state.date}</strong>
        </Typography>
        <Typography variant="h3" align="center">
          {this.state.time}
        </Typography>
      </div>
    );
  }
}

export default CurrentTime;