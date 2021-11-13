import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const axios = require('axios');

function VerticalBar() {
  const [understanding, setUnderstanding] = useState([]);

  useEffect(() => {
    // Update the document title using the browser API

    axios.get("http://localhost:5000/get-data").then(function (response) {

      setUnderstanding(Object.values(response.data));


    }).catch(function (error) {
      console.log(error);
    })
  }, []);

  const average = (arr) => {
    var sumRatings = 0;
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      sumRatings += (i + 1) * e
    }
    return sumRatings / arr.reduce((a, b) => a + b, 0)

  }

  const data = {
    labels: ['Nothing', 'Little', 'Half', 'Most', 'All'],
    datasets: [
      {
        label: 'How much of this lecture\'s content the students understand',
        data: understanding,
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


  return (
    <>

      <Bar data={data} options={options} />
      <Tooltip title={String(Math.round(average(data.datasets[0].data) * 100) / 100)}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Rating value={average(data.datasets[0].data)} precision={0.1} readOnly />
        </Box>
      </Tooltip>
    </>
  )

}

export default VerticalBar;