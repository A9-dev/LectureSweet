import React from 'react';
import { Pie } from 'react-chartjs-2';


const data = {
    labels: ['Understand', 'Confused'],
    datasets: [
    {
        label: '# of Votes',
        data: [12, 9],
        backgroundColor: [
            'rgba(100, 255, 100, 0.2)',
            'rgba(255, 100, 100, 0.2)',
            
        ],
        borderColor: [
            'rgba(100, 255, 100, 1)',
            'rgba(255, 100, 100, 1)',
            
        ],
        borderWidth: 1,
    },
],
};


const PieChart = () => (
  <>
    <Pie data={data}  />
  </>
);

export default PieChart;