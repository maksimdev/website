import React from 'react';
import { Line } from 'react-chartjs-2';
import groupBy from 'lodash/groupBy';

const prepareData = (data) => {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const groupedByYear = groupBy(data, "year");
  const years = Object.keys(groupedByYear).sort();
  const labels = years.reduce((acc, year) => {
    return [ ...acc, ...groupedByYear[year].sort((a, b) => (a.month - b.month)).map(item => `${months[item.month - 1]} ${year}`)]
  }, []);

  const values = years.reduce((acc, year) => {
    return [ ...acc, ...groupedByYear[year].sort((a, b) => (a.month - b.month)).map(item => item.sum)]
  }, []);
  return { labels, values };
}

function chartData(data) {
  const { labels, values } = prepareData(data);
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