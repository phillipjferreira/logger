import React from 'react';
import { Line } from 'react-chartjs-2';

const BurndownChart = ({ dataset, spStart, start }) => {
  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [
  //     {
  //       label: 'Rainfall',
  //       fill: false,
  //       lineTension: 0.5,
  //       backgroundColor: 'rgba(75,192,192,1)',
  //       borderColor: 'rgba(0,0,0,1)',
  //       borderWidth: 2,
  //       data: [65, 59, 80, 81, 56],
  //     },
  //   ],
  // };
  let sample = [
    { t: new Date('October 13, 2014'), y: 10 },
    { t: new Date('October 14, 2014'), y: 15 },
    { t: new Date('October 15, 2014'), y: 22 },
    { t: new Date('October 16, 2014'), y: 24 },
    { t: new Date('October 17, 2014'), y: 31 },
    { t: new Date('October 18, 2014'), y: 55 },
    { t: new Date('October 19, 2014'), y: 61 },
  ];
  let option = {
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
        },
      ],
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      ],
    },
  };
  dataset.length > 0 &&
    dataset.unshift({
      t: start || new Date('June 9, 2020').toISOString(),
      y: spStart,
    });
  let data = {
    datasets: [
      {
        label: 'My Dataset',
        data: dataset,
        fill: false,
        borderColor: 'red',
      },
    ],
  };
  return <Line data={data} options={option} />;
};

export default BurndownChart;
