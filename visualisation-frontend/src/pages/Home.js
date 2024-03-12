import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";
import DoughnutChart from "../components/Charts/DoughnutChart";
import PieChart from "../components/Charts/PieChart";
import Table from "../components/Table/Table";

const Home = () => {
    const [data, setData] = useState({});

    const [country, setCountry] = useState({});
    const [region, setRegion] = useState([]);
    const [relevance, setRelevance] = useState({});
    const [likelihood, setLikelihood] = useState([]);
    const [intensity, setIntensity] = useState([]);
    const [end_year, setEndYear] = useState([]);
    // const [city, setCity] = useState([]);
    const [topic, setTopic] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/api");
                setData(response.data);
                //   console.log(response.data)
                // filter the country databin 
                // console.log(response.data.map(item=>item.country))
                // const filteredData = response.data.filter(item => item.country.trim() !== '');

                setCountry(response.data.filter(item => item.country.trim() !== '')
                    .map(item => item.country)
                )

                setRegion(response.data.filter(item => item.region.trim() !== '').map(item => item.region))
                setRelevance(response.data.map(item => item.relevance))
                setLikelihood(response.data.map(item => item.likelihood))
                setIntensity(response.data.map(item => item.intensity))
                setEndYear(response.data.map(item => item.end_year))
                // setCity(response.data.filter(item => item.region.trim() !== '').map(item => item.city))
                setTopic(response.data.filter(item => item.topic.trim() !== '').map(item => item.topic))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const dataCountsRegion = {};
    for (const location of region) {
        dataCountsRegion[location] = (dataCountsRegion[location] || 0) + 1;
    }

    const dataCountsLikelihood = {};
    for (const location of likelihood) {
        dataCountsLikelihood[location] = (dataCountsLikelihood[location] || 0) + 1;
    }

    const dataCountsEndYear = {};
    for (const location of end_year) {
        dataCountsEndYear[location] = (dataCountsEndYear[location] || 0) + 1;
    }

    // const dataCountsCity = {};
    // for (const location of city) {
    //     dataCountsCity[location] = (dataCountsCity[location] || 0) + 1;
    // }


    return (
        <div>
            <h4>
                <strong>Dashboard</strong>
            </h4>
            <hr />
            <div className="col-12 border home-chart-a overflow-scroll p-2 bg-light rounded-1 w-100">
                <div className="" style={{ minWidth: "600px" }}>
                    <LineChart data={country} title="Country Chart" />
                </div>
            </div>
            <div className="row g-0 justify-content-between">
                <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-light rounded-1 w-100 h-100">
                    <div className="" style={{ minWidth: "400px" }}>
                        <BarChart data={dataCountsRegion} title="Region Chart" />
                    </div>
                </div>

            </div>
            <div className="row g-0 justify-content-between">
                <div className="flex flex-col align-items-center col-lg-4 col-md-3 col-12 border home-chart-b mt-3 bg-light rounded-1">
                    <div className="pie mx-auto">
                        <DoughnutChart data={relevance} title="Relevance Chart" />
                    </div>
                </div>
                <div className="flex align-items-center col-lg-4 col-md-3 col-12 border home-chart-b mt-3 bg-light rounded-1">
                    <div className="pie mx-auto">
                        <PieChart data={dataCountsLikelihood} title="Likelihood Chart" />
                    </div>
                </div>
            </div>
            <div className="row g-0 justify-content-between">
                <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-light rounded-1 w-100 h-100">
                    <div className="" style={{ minWidth: "400px" }}>
                        <BarChart data={dataCountsEndYear} title="End year chart" />
                    </div>
                </div>
            </div>
            <div className="row g-0 justify-content-between">
                <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-light rounded-1 w-100 h-100">
                    <div className="" style={{ minWidth: "400px" }}>
                        <BarChart data={intensity} title="Intensity Chart" />
                    </div>
                </div>

            </div>

            {/* <div className="row g-0 justify-content-between">
                <div className="col-lg-8 col-md-9 col-12 border home-chart-a overflow-scroll p-2 mt-3 bg-light rounded-1 w-100 h-100">
                    <div className="" style={{ minWidth: "400px" }}>
                        <BarChart data={dataCountsCity} title="City Chart" />
                    </div>
                </div>

            </div> */}

            <div className="col-12 border home-chart-a overflow-scroll p-2 bg-light rounded-1 w-100">
                <div className="" style={{ minWidth: "600px" }}>
                    <LineChart data={topic} title="Topic Chart" />
                </div>
            </div>



            <Table stats={data} />
        </div>
    );
};

export default Home;
