import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, title }) => {

  const totalCounts = {};
  for (let i = 0; i < data.length; i++) {
    const number = data[i];
    totalCounts[number] = (totalCounts[number] || 0) + 1;
  }


  // console.log(data)
  var colors =
    data &&
    randomColor({
      count: Object.keys(totalCounts).length,
      luminosity: "dark",
      hue: "random",
      seed: 1,
    });

  const datas = {
    labels: totalCounts ? Object.keys(totalCounts) : [],
    datasets: [
      {
        label: title || "",
        data: totalCounts ? Object.values(totalCounts) : [],
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
        },
      },
      title: {
        display: true,
        text: title || "",
      },
    },
  };

  return (
    <>
      <Doughnut data={datas} options={options} />
    </>
  );
};

export default DoughnutChart;
