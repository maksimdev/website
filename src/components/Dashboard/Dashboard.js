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
import { convertValueToMoneyFormat } from '../../utils/utils';
import moment from 'moment';

const mapStateToProps = (state) => ({
  receipts: state.receipts
});

const mapDispatchToProps = dispatch => ({
  loadReceiptsList: () => dispatch(loadReceipts()),
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

const startOfMonth = moment().startOf('month').valueOf()
const endOfMonth   = moment().endOf('month').valueOf()
const getTotalSum = data => data.reduce((acc, item) => acc += item.totalsum, 0);
const getSumByCurrentMonth = data => getTotalSum(data.filter(item => moment(item.datetime).valueOf() >= startOfMonth && moment(item.datetime).valueOf() <= endOfMonth));

function Dashboard({ receipts: { list, isLoading }, loadReceiptsList }) {
  useEffect(() => {
    loadReceiptsList();
  }, []);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart data={prepareDataToChart(list)} isLoading={isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Total total={getTotalSum(list)} byMonth={getSumByCurrentMonth(list)} isLoading={isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Receipts data={list} isLoading={isLoading} />
          </Paper>
        </Grid>
      </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
