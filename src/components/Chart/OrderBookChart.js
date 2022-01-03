import React from 'react';
import './OrderChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  resposive: true,

  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      // label: 'Dataset 1',
      data: [3, 2, 5, 4, 6, 8, 9],
      borderColor: ['rgb(255, 99, 132)'],
      fill: true,
      backgroundColor: ['rgba(255, 99, 132, 0.5)'],
      // pointBackgroundColor: 'black',
      // pointBorderColor: 'white',
      // tension: 0.3,
    },
  ],
};

function OrderbookChart({ chartData }) {
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
}

export default OrderbookChart;
