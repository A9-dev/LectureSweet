import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'Student attention',
            data: [80, 75, 52, 43, 21, 9],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const LineChart = () => (
    <>

        <Line data={data} options={options} />
    </>
);

export default LineChart;