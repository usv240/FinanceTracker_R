import React from 'react';
import { Bar } from 'react-chartjs-2';

const BudgetChart = () => {
  // Dummy data, replace with actual data from your backend
  const data = {
    labels: ['Groceries', 'Entertainment', 'Utilities'],
    datasets: [
      {
        label: 'Budget Amount',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [500, 200, 300],
      },
    ],
  };

  return (
    <div>
      <h2>Budget Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default BudgetChart;
