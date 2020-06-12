import React from 'react';
import { Line } from 'react-chartjs-2';

const BurndownChart = ({ sprintData: { sprint, chartData } }) => {
  let option = {
    title: {
      display: true,
      position: 'top',
      text: `Burndown Chart - ${sprint.name}`,
      fontSize: 20,
    },
    tooltips: {
      callbacks: {
        title: function (tooltipItem, data) {
          return `${data.datasets[0].data[tooltipItem[0].index].name}`;
        },
        label: function (tooltipItem, data) {
          const t = new Date(data.datasets[0].data[tooltipItem.index].t);
          return `Date: ${t.toDateString()}`;
        },
      },
    },
    responsive: true,
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Story Points',
            fontSize: 12,
          },
        },
      ],
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
          ticks: {
            min: sprint.startDate,
            max: sprint.endDate,
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontSize: 12,
          },
        },
      ],
    },
  };
  let data = {
    datasets: [
      {
        data: chartData,
        fill: false,
        borderColor: 'red',
      },
    ],
  };
  return <Line data={data} options={option} />;
};

export default BurndownChart;
