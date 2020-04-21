import React from 'react';
import { setDate } from '../../redux/reducers/statisticReducer';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import DatePicker from '../DatePicker/DatePicker';
import Title from '../Title/Title';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { convertValueToMoneyFormat } from '../../utils/utils';
import './style.css';

const mapStateToProps = (state) => ({
  statistic: state.statistic.data,
  datePickerIsLoading: state.statistic.isLoading
});

const mapDispatchToProps = dispatch => ({
  handleDateChange: date => dispatch(setDate(date))
});

const prepareData = () => {
  return {
    labels: ['a', 'b', 'c', 'd', 'e'],
    datasets: [{
      data: [1, 2, 3, 4, 5],
      backgroundColor: ['#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE'],
      hoverBackgroundColor: '#808080'
    }]
  };;
}

const getTotalSum = data => data.reduce((acc, item) => acc += item.totalsum, 0);

function DoughnutChart({ statistic: { date, billRequests }, handleDateChange, datePickerIsLoading }) {
  const chartReference = React.createRef();

  return (
    <>
      {datePickerIsLoading ? <LinearProgress /> : <></>}
      <Grid container justify="space-between">
        <Title>Расходы</Title>
        <DatePicker value={date} onChange={handleDateChange} disabled={datePickerIsLoading}/>
      </Grid>
      <div className="chartWrapper">
        <span className="chartTitle">
          <Typography component="p" variant="h6">
            {convertValueToMoneyFormat(getTotalSum(billRequests))} руб
          </Typography>
        </span>
        <Doughnut
            ref={chartReference}
            data={prepareData()}
            width={500}
            height={500}
            options={{
              title: {
                display: false,
                text: 'Расходы за текущий месяц'
              },
              legend: {
                display: true,
                position: 'bottom'
              },
              maintainAspectRatio: false
            }}
        />
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DoughnutChart);