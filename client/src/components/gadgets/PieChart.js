import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ status }) => {
  let data = {
    datasets: [
      {
        data: status,
        backgroundColor: ['#c4183c', '#ffb400', '#17c671'],
      },
    ],
    labels: ['To-Do', 'In-Progress', 'Done'],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;
