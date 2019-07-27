import React, { Component } from 'react';

import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import SetAlarm from './SetAlarm';

const NewAlarmScreen = (props) => {
  return (
    <div>
      <SetAlarm submitAlarm={props.submitAlarm} currentAlarmTime={props.currentAlarmTime}/>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="outlined" color="secondary" fullWidth={true}>
          Cancel
        </Button>
      </Link>

    </div>
  );
}

export default NewAlarmScreen;

