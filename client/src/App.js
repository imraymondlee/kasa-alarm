import React, { Component } from 'react';
import axios from 'axios';
import CurrentTime from './Components/CurrentTime';
import SetAlarm from './Components/SetAlarm';
import CurrentAlarms from './Components/CurrentAlarms';
import './App.css';

import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#acf1f6',
      main: '#43c9d5',
      dark: '#0890a8',
      contrastText: '#ffffff'
    }
  },
});


class App extends Component {
  constructor() { 
    super();
    this.state = {
      currentAlarmTime : 'No alarms have been set.',
      lightsOn: false
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

    axios.get('/light-status')
      .then((response) => {
        this.setState({
          lightsOn: response.data
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
    });
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
    });
  }

  toggleLights = () => {
    if(this.state.lightsOn === false) {
      axios.post('/bulb-on')
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });

      this.setState({
        lightsOn: true
      });
    } else {
      axios.post('/bulb-off')
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });

      this.setState({
        lightsOn: false
      });
    }
  }

  render() {
    const { classes } = this.props;

    let status = <Typography variant="body1" align="center" color="error">
                  {this.state.status}
                </Typography>

    return (
      <ThemeProvider theme={theme}>
        <main className={classes.main}>
          {status}
          <Paper className={classes.paper}>

            <Box display="flex" justifyContent="space-between" mt={3} mb={5}>
              <Box>
                <Typography variant="h5" align="center" style={{color: "#0890a8"}}>
                  <strong>Kasa Alarm</strong>
                </Typography>
              </Box>
              <Box>
                {this.state.lightsOn === true ? (
                  <Button variant="contained" style={{backgroundColor: "#78c747", color: "#ffffff"}} onClick={this.toggleLights}>
                    Turn lights off
                  </Button>
                ) : (
                  <Button variant="outlined" style={{borderColor: "#78c747", color: "#78c747"}} onClick={this.toggleLights}>
                    Turn lights on
                  </Button>
                )}
              </Box>
            </Box>

            <Box mt={1} mb={3}>
              <CurrentTime/>
            </Box>

            <Box mt={1} mb={3}>
              <SetAlarm submitAlarm={this.submitAlarm} currentAlarmTime={this.state.currentAlarmTime}/>
            </Box>
  
            <CurrentAlarms currentAlarmTime={this.state.currentAlarmTime} deleteAlarm={this.deleteAlarm}/>
          </Paper>
        </main>
      </ThemeProvider>

    );
  }
}

export default withStyles(styles)(App);

