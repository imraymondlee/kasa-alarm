import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CurrentTime from './CurrentTime';
import CurrentAlarms from './CurrentAlarms';

const useStyles = makeStyles(theme => ({
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(3),
    left: '50%',
    transform: 'translateX(-50%)'
  }
}));

const NewLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/new-alarm-screen" {...props} />
));

const MainScreen = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Box mt={1} mb={3}>
        <CurrentTime/>
      </Box>
      <hr />
      <CurrentAlarms currentAlarmTime={props.currentAlarmTime} deleteAlarm={props.deleteAlarm}/>


      <Box mt={5} mb={1} textAlign="center" className={classes.addButton}>
        <Fab component={NewLink} color="primary" aria-label="Add" size="small">
          <AddIcon />
        </Fab>
      </Box>

    </div>
  );
}

export default MainScreen;

