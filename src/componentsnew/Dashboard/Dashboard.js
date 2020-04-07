import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Chart from '../Chart/Chart';
import Deposits from '../Deposits/Deposits';
import Receipts from '../Receipts/Receipts';
import { loadReceipts } from '../../redux/reducers/receiptsReducer';

import { Api } from '../../api/Api';

const mapStateToProps = (state) => ({
  receipts: state.receipts.list,
});

const mapDispatchToProps = (dispatch) => ({
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

function Dashboard({ receipts, loadReceiptsList }) {
  useEffect(() => {
    loadReceiptsList();
  }, []);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Receipts data={receipts}/>
          </Paper>
        </Grid>
      </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
