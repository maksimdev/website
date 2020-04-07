import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import Title from '../Title/Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Total({ total, isLoading }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Потрачено:</Title>
      {isLoading ? <LinearProgress /> : <></>}
      <Typography component="p" variant="h4">
        {total || 0} руб.
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        на {moment().format('DD/MM/YYYY')}
      </Typography>
    </React.Fragment>
  );
}