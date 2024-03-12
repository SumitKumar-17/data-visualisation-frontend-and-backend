import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Select from "../Forms/Select";
import axios from "axios";

const Table = () => {
    const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [stats, setStats] = useState({});
  //   const [stats, setStats] = useState({});
  const [filter, setFilter] = useState({
      end_year: "",
      topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
    quantity: 20,
    pagination: 0,
    sortBy: "" ,
});
const entryRef = useRef(filter.quantity);

const url = `http://localhost:3000/api?end_year=${filter.end_year}&topic=${filter.topic}&sector=${filter.sector}&region=${filter.region}&pestle=${filter.pestle}&source=${filter.source}&country=${filter.country}&quantity=${filter.quantity}&pagination=${filter.pagination}&sortBy=${filter.sortBy}`;
const fetchData = async () => {
    try {
      const response = await axios.post(url,filter);
      const filteredData = response.data.filter(item => item.end_year !== '');
      // console.log(filteredData)
      setData(filteredData);
      setCount(response.data.length);
      const stats = {
          end_year: getUniqueValues(filteredData.map(item => item.end_year)),
          topic: getUniqueValues(filteredData.map(item => item.topic)),
          sector: getUniqueValues(filteredData.map(item => item.sector)),
          region: getUniqueValues(filteredData.map(item => item.region)),
          pestle: getUniqueValues(filteredData.map(item => item.pestle)),
          source: getUniqueValues(filteredData.map(item => item.source)),
          country: getUniqueValues(filteredData.map(item => item.country)),
          };
          // console.log(stats)
      setStats(stats);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    
    fetchData();
  }, [filter]);


 const getUniqueValues = (array) => {
    return Array.from(new Set(array));
  };

  const addFilter = ([name, value]) => {
    const obj = { ...filter };
    obj[name] = value;
    setFilter(obj);
  };

  const handleSortBy = (sortByValue) => {
    setFilter({ ...filter, sortBy: sortByValue });
  };


  const handleApplyFilters = () => {
    fetchData(); // Call fetchData when Apply button is clicked
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center my-3">
        Show{" "}
        <span>
          <select
            ref={entryRef}
            value={filter.quantity}
            onChange={(e) =>
              setFilter({ ...filter, quantity: +entryRef.current.value })
            }
            className="form-select form-select-sm mx-2"
            style={{ width: "unset" }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="60">60</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
            <option value="100">100</option>
          </select>
        </span>{" "}
        entries.
      </div>
      <div className="">
        <span className="pl-3">Filter by:</span>
        <Select
          returnFilter={addFilter}
          name={"end_year"}
          data={stats.end_year}
        />
        <Select returnFilter={addFilter} name={"topic"} data={stats.topic} />
        <Select returnFilter={addFilter} name={"sector"} data={stats.sector} />
        <Select returnFilter={addFilter} name={"region"} data={stats.region} />
        <Select returnFilter={addFilter} name={"pestle"} data={stats.pestle} />
        <Select returnFilter={addFilter} name={"source"} data={stats.source} />
        <Select
          returnFilter={addFilter}
          name={"country"}
          data={stats.country}
        />
      </div>

      <div className="table-responsive" style={{ width: "100%" }}>
      <button className="btn btn-primary" onClick={handleApplyFilters}>
        Apply
      </button>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
            <th onClick={() => handleSortBy('end_year')}>End year</th>
              <th onClick={() => handleSortBy('topic')}>Topics</th>
              <th onClick={() => handleSortBy('sector')}>Sector</th>
              <th onClick={() => handleSortBy('region')}>Region</th>
              <th onClick={() => handleSortBy('pestle')}>Pest</th>
              <th onClick={() => handleSortBy('source')}>Source</th>
              <th onClick={() => handleSortBy('country')}>Country</th>
            </tr>
          </thead>
          

          <tbody>
          {data.length >= 1 ? (
  data
    .filter((item) => item.end_year !== '') // Filter out items with empty end_year
    .map((data) => (
      <tr key={data._id} style={{ verticalAlign: "middle" }}>
        <td>{data.end_year}</td>
        <td>{data.topic}</td>
        <td>{data.sector}</td>
        <td>{data.region}</td>
        <td>{data.pestle}</td>
        <td>{data.source}</td>
        <td>{data.country}</td>
      </tr>
    ))
) : (
  <tr>
    <td colSpan="7" className="text-center">
      <div className="spinner-border spinner-border-sm"></div>
    </td>
  </tr>
)}

          </tbody>
          {count && (
            <tfoot>
              <tr>
                <th colSpan="7">
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                      <p className="m-0">
                        Showing {filter.pagination + 1} of{" "}
                        {Math.ceil(count / filter.quantity)} entries
                      </p>
                    </div>
                    <div>
                      <button className="btn btn-outline-dark btn-sm ms-2">
                        <FaArrowLeft />{" "}
                        <span
                          className=" d-none d-sm-inline-block"
                          onClick={() =>
                            setFilter({
                              ...filter,
                              pagination:
                                filter.pagination - 1 !== -1
                                  ? filter.pagination - 1
                                  : filter.pagination,
                            })
                          }
                        >
                          Prev
                        </span>
                      </button>
                      <button
                        className="btn btn-outline-dark btn-sm ms-2"
                        onClick={() =>
                          setFilter({
                            ...filter,
                            pagination:
                              filter.pagination + 1 !==
                              Math.ceil(count / filter.quantity)
                                ? filter.pagination + 1
                                : filter.pagination,
                          })
                        }
                      >
                        <span className=" d-none d-sm-inline-block">Next</span>{" "}
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </th>
              </tr>
            </tfoot>
          )}

        </table>
      </div>
    </>
  );
};

export default Table;
