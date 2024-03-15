import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const CurrentVolatge = () => {
  const [data, setData] = useState({
    x: [],
    current: [],
    voltage: [],
  });

  useEffect(() => {
    let secondsCounter = 1;

    const interval = setInterval(() => {
      const baseCurrent = 130;
      const deviationCurrent = 10;
      const randomCurrent = baseCurrent * (1 + Math.random() * (deviationCurrent / 100));

      const baseVoltage = 17;
      const deviationVoltage = 10;
      const randomVoltage = baseVoltage * (1 + Math.random() * (deviationVoltage / 100));

      const newTime = secondsCounter

      setData((prevData) => ({
        x: [...prevData.x.slice(-9), newTime],
        current: [...prevData.current.slice(-9), randomCurrent],
        voltage: [...prevData.voltage.slice(-9), randomVoltage],
      }));

      secondsCounter++;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const layout = {
    title: "Current and Voltage Plot",
    plot_bgcolor:'#e9e9e9',
    paper_bgcolor:"#e9e9e9",
    margin: {
      l: 50, // Left margin
      r: 50, // Right margin
      t: 50, // Top margin
      b: 50, // Bottom margin
    },
    
    xaxis: {
      title: "Time",
      
    },
    yaxis: {
      title: "Current (A)",
      titlefont: { color: "rgba(54, 162, 235, 1)" },
      tickfont: { color: "rgba(54, 162, 235, 1)" },
      range:[120, 160],

    },
    yaxis2: {
      title: "Voltage (V)",
      titlefont: { color: "rgba(255, 15, 70, 1)" },
      tickfont: { color: "rgba(255, 15, 70, 1)" },
      overlaying: "y",
      side: "right",
    },
  };

  const trace1 = {
    x: data.x,
    y: data.current,
    name: "Current",
    type: "scatter",
    yaxis: "y1",
  };

  const trace2 = {
    x: data.x,
    y: data.voltage,
    name: "Voltage",
    type: "scatter",
    yaxis: "y2",
  };


  

  return (
    <div>
      <Plot
        data={[trace1, trace2]}
        layout={layout}
        style={{  border:'1px solid #a6a6a6' , backgroundColor:'black',padding:0, width: "100%", height: "280px" }}
      />
    </div>
  );
};

export default CurrentVolatge;
