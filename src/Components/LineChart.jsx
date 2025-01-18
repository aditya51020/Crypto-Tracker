import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Price"]];

    if (historicalData && Array.isArray(historicalData)) {
      historicalData.forEach(([timestamp, price]) => {
        const date = new Date(timestamp);  // Correct conversion to Date object
        if (!isNaN(date.getTime()) && !isNaN(price)) {
          dataCopy.push([date, parseFloat(price)]);  // Use Date object
        }
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      options={{
        hAxis: { title: 'Date' },
        vAxis: { title: 'Price' },
        legend: 'none',
      }}
    />
  );
};

export default LineChart;
