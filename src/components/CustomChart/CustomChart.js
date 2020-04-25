import React from 'react';
import Title from '../Title/Title';
import Grid from '@material-ui/core/Grid';
import { Line, Bar } from 'react-chartjs-2';

export default class CustomChart extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Grid container justify="flex-start">
          <Title>{this.props.title}</Title>
        </Grid>
        {
          this.props.chartType === 'Line'
          ? <Line
              height={300}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: true,
                  position: 'bottom'
                }
              }}
              data={this.props.data}
            />
          : <Bar
          height={300}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
          data={this.props.data}
        />
      } 
      </div>
    )
  }
};

/*

import React from 'react';
import Title from '../Title/Title';
import Grid from '@material-ui/core/Grid';
import { Line } from 'react-chartjs-2';

function chartData(data) {
  const labels = data.map(item => item.datetime);
  const values = data.map(item => item.totalsum);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Расходы',
        borderColor: '#483D8B',
        pointBackgroundColor: '#424242',
        backgroundColor: 'rgba(12, 126, 55, 0.1)',
        data: values
      }
    ]
  };
}

export default class LineChart extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Grid container justify="flex-start">
          <Title>Расходы по месяцам</Title>
        </Grid>
        <Bar
          height={500}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: true,
              position: 'bottom'
            }
          }}
          data={chartData(this.props.data)}
        />
      </div>
    )
  }
};

*/