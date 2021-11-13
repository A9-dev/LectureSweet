import React from 'react';
import { Bar } from 'react-chartjs-2';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';


const average = (arr) => {
  var sumRatings = 0;
  for (let i = 0; i < arr.length; i++) {
    const e = arr[i];
    sumRatings += (i + 1) * e
  }
  return sumRatings / arr.reduce((a, b) => a + b, 0)

}

const data = {
  labels: ['1/5', '2/5', '3/5', '4/5', '5/5'],
  datasets: [
    {
      label: 'Student\'s Understanding',
      data: [1, 2, 3, 4, 5],
      backgroundColor: [
        'rgba(218, 43, 86, 0.5)',
        'rgba(219, 91, 35, 0.5)',
        'rgba(192, 137, 0, 0.5)',
        'rgba(142, 175, 0, 0.5)',
        'rgba(31, 206, 96, 0.5)',
      ],
      borderColor: [
        'rgba(218, 43, 86, 1)',
        'rgba(219, 91, 35, 1)',
        'rgba(192, 137, 0, 1)',
        'rgba(142, 175, 0, 1)',
        'rgba(31, 206, 96, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => (
  <>
    <Bar data={data} options={options} />
    <Tooltip title={String(Math.round(average(data.datasets[0].data) * 100) / 100)}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Rating value={average(data.datasets[0].data)} precision={0.1} readOnly />
      </Box>
    </Tooltip>
  </>
);

export default VerticalBar;