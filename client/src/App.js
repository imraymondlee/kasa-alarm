import React, { Component } from 'react';
import axios from 'axios';
import CurrentTime from './Components/CurrentTime';
import SetAlarm from './Components/SetAlarm';
import CurrentAlarms from './Components/CurrentAlarms';
import './App.css';

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


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
      light: '#48cad5',
      main: '#48cad5',
      dark: '#3ec7d3',
      contrastText: '#fff',
    }
  },
});


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
    const { classes } = this.props;

    let status = <Typography variant="body1" align="center" color="error">
                  {this.state.status}
                </Typography>

    return (
      <MuiThemeProvider theme={theme}>
        <main className={classes.main}>
          {status}
          <Paper className={classes.paper}>
              <CurrentTime/>
              <SetAlarm submitAlarm={this.submitAlarm} currentAlarmTime={this.state.currentAlarmTime}/>
              <CurrentAlarms currentAlarmTime={this.state.currentAlarmTime} deleteAlarm={this.deleteAlarm}/>
          </Paper>
        </main>
      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(App);

