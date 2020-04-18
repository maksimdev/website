import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Chart from '../Chart/Chart';
import Total from '../Total/Total';
import Receipts from '../Receipts/Receipts';
import { loadReceipts } from '../../redux/reducers/receiptsReducer';
import { setDate } from '../../redux/reducers/statisticReducer';
import { convertValueToMoneyFormat } from '../../utils/utils';
import moment from 'moment';
import LineChart from '../LineChart/LineChart';
import DoughnutChart from '../DoughnutChart/DoughnutChart';

const mapStateToProps = (state) => ({
  statistic: state.statistic
});

const mapDispatchToProps = dispatch => ({
  setDate: () => dispatch(setDate()),
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

const prepareDataToChart = data => {
  const convertToDate = date => date.split('T')[0];
  return data.map(item => ({ ...item, datetime: convertToDate(item.datetime), totalsum: convertValueToMoneyFormat(item.totalsum) })).reverse();
};

function Dashboard({ loadReceiptsList, statistic, setDate }) {
  useEffect(() => {
    setDate(new Date());
  }, []);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DoughnutChart />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Receipts data={statistic.data.statistic} isLoading={statistic.isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <LineChart data={prepareDataToChart(statistic.data.statistic)} />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={prepareDataToChart(list)} isLoading={isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Total total={getTotalSum(list)} byMonth={getSumByCurrentMonth(list)} isLoading={isLoading} />
          </Paper>
        </Grid> */}
      </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
