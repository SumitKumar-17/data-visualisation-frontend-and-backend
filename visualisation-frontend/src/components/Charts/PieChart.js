import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import randomColor from "randomcolor";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {

    // console.log(data)
    var colors =
        data &&
        randomColor({
            count: Object.keys(data).length,
            luminosity: "dark",
            hue: "random",
            seed: 1,
        });
    const dataObj = {
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
            <Pie data={dataObj} options={options} />
        </>
    );
};

export default PieChart;
