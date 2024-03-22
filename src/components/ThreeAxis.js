
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import SaveModal from "./SaveModal";


const ThreeAxis = () => {
  const [data, setData] = useState({
    x: [],
    current: [],
    voltage: [],
    temperature: [],
  });

  const [isRunning, setIsRunning] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    let secondsCounter = 1;

    const interval = setInterval(() => {
      const baseCurrent = 130;
      const deviationCurrent = 10;
      const randomCurrent =
        baseCurrent * (1 + Math.random() * (deviationCurrent / 100));

      const baseVoltage = 17;
      const deviationVoltage = 10;
      const randomVoltage =
        baseVoltage * (1 + Math.random() * (deviationVoltage / 100));

      const randomTemperature =
        Math.floor(Math.random() * (1800 - 500 + 1)) + 500;

      const newTime = secondsCounter;

      if (isRunning) {
        setCSVData((prevData) => [
          ...prevData,
          [newTime, randomCurrent, randomVoltage, randomTemperature],
        ]);
      }

      setData((prevData) => ({
        x: [...prevData.x.slice(-9), newTime],
        current: [...prevData.current.slice(-9), randomCurrent],
        voltage: [...prevData.voltage.slice(-9), randomVoltage],
        temperature: [...prevData.temperature.slice(-9), randomTemperature],
      }));

      secondsCounter++;
    }, 100);

    return () => {
      clearInterval(interval);
      if (csvData.length > 0 && !isRunning) {
        handleStopClick();
      }
    };
  }, [isRunning]);

  const handleStartClick = () => {
    setIsRunning(true);
    setShowPopUp(true);

    setTimeout(() => {
      setShowPopUp(false);
    }, 3000); 
  };

  const handleStopClick = () => {
    setIsRunning(false);

    const fileName = prompt(
      "Enter file name to save (without extension):",
      "graph_data"
    );

    if (fileName) {
      const csvString = Papa.unparse({
        fields: ["Time (ms)", "Current (A)", "Voltage (V)", "Temperature (°C)"],
        data: csvData,
      });

      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;

      if (fileName.endsWith(".csv")) {
        link.setAttribute("download", fileName);
      } else {
        link.setAttribute("download", fileName + ".csv");
      }

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setCSVData([]);
    }
  };

  const layout = {
    title: "Current, Voltage and Temperature Plot",
    plot_bgcolor: "#e9e9e9",
    paper_bgcolor: "#e9e9e9",
   
    margin: {
      l: 80,
      r: 50,
      t: 50,
      b: 50,
    },

    xaxis: {
      title: "Time",
      domain: [0.14, 1],
    },
    yaxis: {
      title: "Current (A)",
      titlefont: { color: "#23b7e5" },
      tickfont: { color: "#23b7e5" },
      range: [120, 160],
    },
    yaxis2: {
      title: "Voltage (V)",
      titlefont: { color: "#1b5e20" },
      tickfont: { color: "#1b5e20" },
      range: [10, 25],
      anchor: "free",
      overlaying: "y",
      position: 0.05,
      side: "left",
    },
    yaxis3: {
      title: "Temperature (°C)",
      titlefont: { color: "#cc5500" },
      tickfont: { color: "#cc5500" },
      range: [500, 2000],
      anchor: "free",
      overlaying: "y",
      position: 0.1,
      side: "left",
    },
  };

  const trace1 = {
    x: data.x,
    y: data.current,
    name: "Current",
    type: "scatter",
    yaxis: "y",
    mode: "lines+markers",
    marker: {
      color: "#23b7e5",
    },
  };

  const trace2 = {
    x: data.x,
    y: data.voltage,
    name: "Voltage",
    type: "scatter",
    yaxis: "y2",
    mode: "lines+markers",
    marker: {
      color: "#1b5e20",
    },
  };

  const trace3 = {
    x: data.x,
    y: data.temperature,
    mode: "lines+markers",
    name: "Temperature",
    type: "scatter",
    yaxis: "y3",
    mode: "lines+markers",
    marker: {
      color: "#cc5500",
    },
  };

  return (
    <div className="flex flex-row">
      <Plot
        data={[trace1, trace2, trace3]}
        layout={layout}
        style={{ border: "1px solid #a6a6a6", backgroundColor: "black", padding: 0, width: "90%", height: "30vh" }}
      />
      <div className=" p-3 m-5 savegraph">
        <b>Save graph data as CSV</b>
        <div className="graphbtn">
          <div>
            <button className="startgraphbtn" onClick={handleStartClick}> Start </button>
          </div>
          <div>
            <button className="stopgraphbtn" onClick={handleStopClick}> Stop</button>
          </div>
        </div>
      </div>
      <SaveModal open={showPopUp} />
    </div>
  );
};


export default ThreeAxis;