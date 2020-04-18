import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import moment from 'moment';
import Title from '../Title/Title';
import { convertValueToMoneyFormat } from '../../utils/utils';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Total({ total, byMonth, isLoading }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Итого:</Title>
      {isLoading ? <LinearProgress /> : <></>}
      <Typography component="p" variant="h6">
        За весь период: <br /> {!isLoading ? convertValueToMoneyFormat(total) : 0} руб.
      </Typography>
      <Typography component="p" variant="h6">
        За месяц: <br /> {!isLoading ? convertValueToMoneyFormat(byMonth) : 0} руб.
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {moment().format('DD/MM/YYYY')}
      </Typography>
    </React.Fragment>
  );
}