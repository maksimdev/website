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
        <Line
          height={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: false,
              text: 'Ежемесечные рассходы'
            },
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