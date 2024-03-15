import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Tempgraph = () => {
  const [data, setData] = useState({
    x: [],
    Temperature: [],

  });

  useEffect(() => {
    let secondsCounter = 1;

    const interval = setInterval(() => {
      const randomTemperature = Math.floor(Math.random() * (1800 - 500 + 1)) + 500;

      const newTime = secondsCounter
      setData((prevData) => ({
        x: [...prevData.x.slice(-9), newTime],
        Temperature: [...prevData.Temperature.slice(-9), randomTemperature],

      }));

      secondsCounter++;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const layout = {
    title: "Temperature v/s Time Plot",
    plot_bgcolor: '#e9e9e9',
    paper_bgcolor: "#e9e9e9",
    margin: {

      t: 50, // Top margin
      b: 50, // Bottom margin
    },
    xaxis: {
      title: "Time",

    },
    yaxis: {
      title: "Temperature",
      titlefont: { color: "rgba(54, 162, 235, 1)" },
      tickfont: { color: "rgba(154, 62, 35, 1)" },
      range: [500, 1900],

      tickvals: Array.from({ length: 14 }, (_, index) => 500 + index * 100)
    },

  };

  const trace1 = {
    x: data.x,
    y: data.Temperature,
    name: "Temperature",
    type: "scatter",

  };

  return (
    <div>
      <Plot
        data={[trace1]}
        layout={layout}
        style={{ border: '1px solid #a6a6a6', width: "25vw", height: "93vh" }}
      />
      {/* <TempColMap tempvalue = {data.Temperature} /> */}
    </div>
  );
};

export default Tempgraph;

