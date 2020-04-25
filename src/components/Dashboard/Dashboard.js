import React, { useEffect } from 'react';
import { groupBy } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Receipts from '../Receipts/Receipts';
import { setDate } from '../../redux/reducers/statisticReducer';
import CustomChart from '../CustomChart/CustomChart';
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

const prepareDataToChart = ({ date, billRequests }) => {
  const daysInMonth = moment(date).daysInMonth();
  const labels = [];
  for (let i = 0; i < daysInMonth; i++) {
    labels.push(i + 1);
  }
  const v = billRequests.map(({ datetime, totalsum }) => ({ day: +datetime.split('T')[0].split('-')[2], sum: Math.floor(totalsum) / 100 }));
  const groupped = groupBy(v, 'day');
  for (let o in groupped) {
    groupped[o] = groupped[o].reduce((sum, obj) => sum + obj.sum, 0);
  }
  const values = labels.map(i => (groupped[i] || 0));
  return {
    labels: labels,
    datasets: [
      {
        label: 'Расходов за день',
        borderColor: '#483D8B',
        pointBackgroundColor: '#424242',
        backgroundColor: 'rgba(12, 126, 55, 0.1)',
        data: values
      }
    ]
  };
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
            <Receipts data={statistic.data.billRequests} isLoading={statistic.isLoading} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CustomChart chartType="Bar" title={'Статистика за месяц'} data={prepareDataToChart(statistic.data)} />
          </Paper>
        </Grid>
      </Grid>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
