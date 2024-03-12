import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const countPersonsByCountry = (data) => {
  const countriesData = {};
  for (let i = 0; i < data.length; i++) {
    const country = data[i];
    countriesData[country] = (countriesData[country] || 0) + 1;
  }
  return countriesData;
};

const LineChart = ({ data, title }) => {
  // console.log(data);

  const countriesData = countPersonsByCountry(data);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title || "",
      },
    },
  };

  var colors =
    data &&
    randomColor({
      count: Object.keys(countriesData).length,
      luminosity: "dark",
      hue: "random",
      seed: 1,
    });

  const datas = {
    labels: Object.keys(countriesData),
    datasets: [
      {
        label: "Number of Persons",
        data: Object.values(countriesData),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Line data={datas} options={options} />
    </>
  );
};

export default LineChart;
