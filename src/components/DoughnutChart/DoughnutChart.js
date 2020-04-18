import React from 'react';
import Title from '../Title/Title';
import { Doughnut } from 'react-chartjs-2';
import DatePicker from '../DatePicker/DatePicker';
import Grid from '@material-ui/core/Grid';
import './style.css';

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

export default class DoughnutChart extends React.Component {
    constructor(props) {
      super(props);
      this.chartReference = React.createRef();
    }
  
    render() {
      return (
        <>
          <Grid container justify="space-between">
            <Title>Рассходы</Title>
            <DatePicker />
          </Grid>
          <div className="chartWrapper">
            <span className="chartTitle">123456 руб</span>
            <Doughnut
                ref={this.chartReference}
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
        )
    }
  }