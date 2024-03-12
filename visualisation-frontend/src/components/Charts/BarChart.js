import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title }) => {

  // console.log(data)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title || "",
        align: "start",
      },
    },
  };

  var colors =
    data &&
    randomColor({
      count: Object.keys(data).length,
      luminosity: "dark",
      hue: "random",
      seed: 1,
    });

  const datas = {
    labels: data ? Object.keys(data) : [],
    datasets: [
      {
        label: title || "",
        data: data ? Object.values(data) : [],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Bar data={datas} options={options} />
    </>
  );
};

export default BarChart;
