import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ status }) => {
  let option = {
    //   title: {
    //     display: true,
    //     position: 'top',
    //     text: `Burndown Chart - ${sprint.name}`,
    //     fontSize: 20,
    //   },
    //   tooltips: {
    //     callbacks: {
    //       title: function (tooltipItem, data) {
    //         return `${data.datasets[0].data[tooltipItem[0].index].name}`;
    //       },
    //       label: function (tooltipItem, data) {
    //         const t = new Date(data.datasets[0].data[tooltipItem.index].t);
    //         return `Date: ${t.toDateString()}`;
    //       },
    //     },
    //   },
    //   responsive: true,
  };
  let data = {
    datasets: [
      {
        data: status,
        backgroundColor: ['Red', 'Yellow', 'Blue'],
      },
    ],
    labels: ['Red', 'Yellow', 'Blue'],
  };
  return (
    <div>
      <Doughnut data={data} options={option} />
    </div>
  );
};

export default PieChart;
