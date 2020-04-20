import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Receipts from '../Receipts/Receipts';
import { setDate } from '../../redux/reducers/statisticReducer';
import { convertValueToMoneyFormat } from '../../utils/utils';
import LineChart from '../LineChart/LineChart';
import DoughnutChart from '../DoughnutChart/DoughnutChart';

const mapStateToProps = (state) => ({
  statistic: state.statistic
});

const mapDispatchToProps = dispatch => ({
  setDate: date => dispatch(setDate(date)),
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

function Dashboard({ statistic, setDate }) {
  useEffect(() => {
    setDate(statistic.data.date);
  }, []);

  const classes = useStyles();

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
      </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
