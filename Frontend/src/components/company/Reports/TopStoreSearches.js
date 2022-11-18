import React from 'react';
import ReactApexChart from "react-apexcharts";

function createData(customerName, customerEmail, firstOrderDate, lastOrderDate, ordersToDate) {
  return { customerName, customerEmail, firstOrderDate, lastOrderDate, ordersToDate };
}

const series = [
    {
        data: [
          {
            x: 'insurance providers',
            y: 218
          },
          {
            x: 'niche insurance providers',
            y: 149
          },
          {
            x: 'renters insurance providers',
            y: 184
          },
          {
            x: 'all state',
            y: 55
          },
          {
            x: 'all state finance',
            y: 84
          },
          {
            x: 'insurers',
            y: 31
          },
          {
            x: 'insurance',
            y: 70
          },
          {
            x: 'policy',
            y: 30
          },
          {
            x: 'get a quote',
            y: 44
          },
        ]
      }
  ]
const TopStoreSearches = () => {

    const chartData = {
        legend: {
            show: false
          },
        chart: {
          type: "treemap",
          id: "apexchart-example",
          height: 350,
        },
        title: {
            text: 'Top Search terms',
            align: 'center',
          },
          colors: [
            '#0C68AA'
          ],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          },
    }
    return(
        <>
        <br/><br/>
            <ReactApexChart options={chartData} series={series} type="treemap" width={1200} height={500} />
            <br/><br/>
        </>
    );
};

export default TopStoreSearches;