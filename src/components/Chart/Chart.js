import Chart from 'chart.js';

const ctx = 'myChart';

let MyChart = new Chart(ctx, {
    type: 'doughnut',
    data: [3, 15, 40],
});

export default MyChart;