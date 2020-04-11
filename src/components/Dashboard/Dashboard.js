import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Chart from '../Chart/Chart';
import Total from '../Total/Total';
import Receipts from '../Receipts/Receipts';

const mapStateToProps = (state) => ({
  receipts: state.receipts,
  statistic: state.statistic
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard({ receipts, statistic }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={statistic.statistic.currentMonth} isLoading={statistic.isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Total total={statistic.statistic.total} isLoading={statistic.isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Receipts data={receipts.list} isLoading={receipts.isLoading} />
          </Paper>
        </Grid>
      </Grid>
    );
}

export default connect(mapStateToProps)(Dashboard);
