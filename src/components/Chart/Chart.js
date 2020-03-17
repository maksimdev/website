import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const colors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#32CD32',
  '#B22222',
  '#C71585',
  '#FF7F50',
  '#FFD700',
  '#FFDAB9',
  '#9370DB',
  '#7FFFD4',
  '#7B68EE',
  '#DAA520',
  '#BDB76B',
  '#F0E68C',
  '#5F9EA0',
  '#E0FFFF',
  '#FFE4E1'
  ];

export const aggregateData = (data) => data.reduce((acc, item) => {
  if (acc[item.category_id]) {
    acc[item.category_id] += item.cost;
    return acc;
  } else {
    return {...acc, [item.category_id]: item.cost}
  }
  }, {})

export const combineCategoryAndCostsToArrOfObj = (aggregatedData, categories) => (
  Object.keys(aggregatedData).map((item) => {
    const category = categories.find((i)=> i.id == item );
    return { [category.title]: aggregatedData[item]  }
  })
)

const prepareDate = (data, categories) => {
  const aggregatedData = aggregateData(data);

  const combinedData = combineCategoryAndCostsToArrOfObj(aggregatedData, categories)

  const reverse = colors.reverse();
  return {
    labels: combinedData.map(item => Object.keys(item)[0]),
    datasets: [{
      data: combinedData.map(item => Object.values(item)[0]),
      backgroundColor: colors,
      hoverBackgroundColor: '#808080'
    }]
  };
}

export class Chart extends React.Component {
    constructor(props) {
      super(props);
      this.chartReference = React.createRef();
    }
  
    render() {
      console.log(this.props)
      prepareDate(this.props.data, this.props.categories);

      return (
        <Doughnut
            ref={this.chartReference}
            data={prepareDate(this.props.data, this.props.categories)}
        />
        )
    }
  }