import React, { Component } from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
  slot: {
    borderTop: '1px solid #e2e2e2',
    borderBottom: '1px solid #e2e2e2',
    padding: '0.25rem'
  },
  time: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#0890a8'
  },
  date: {
    fontSize: '0.8rem'
  }
}));


const CurrentAlarms = (props) => {

  const classes = useStyles();

  let date = moment(props.currentAlarmTime).format("MMMM Do YYYY");
  let time = moment(props.currentAlarmTime).format("h:mm A");

  return (
    <div>

      {date === 'Invalid date' || time === 'Invalid date' ? (
        <div></div>
      ) : (
        <Grid container wrap="nowrap" spacing={2} justify="space-between" alignItems="center" className={classes.slot}>
          <Grid item>
            <div className={classes.date}>{date}</div>
            <div className={classes.time}>{time}</div>
          </Grid>
          <Grid item>
            <Fab aria-label="Add" size="small" onClick={() => props.deleteAlarm(props.currentAlarmTime)}>
              <DeleteIcon style={{fill: "grey"}} />
            </Fab>
          </Grid>
        </Grid>
      )}




    </div>
  );
}

export default CurrentAlarms;