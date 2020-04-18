import React from 'react';
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
    console.log('props: ', this.props);
    return (
      <div>
        <Line
          height={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
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