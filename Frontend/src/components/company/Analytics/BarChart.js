import React from "react";
import { useTheme } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import { labels } from "./data/weekSales";
import ChartTitle from "./ChartTitle";
import { Box } from "@material-ui/core";
import { chartStyles } from "./styles/charts.styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(chartStyles);

const BarChart = () => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: theme.palette.background.default,
        borderColor: "#0c68aa",
        borderWidth: 1,
        hoverBackgroundColor: theme.palette.primary.main,
        hoverBorderColor: theme.palette.background.default,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Revenue",
            fontSize: 18,
            fontColor: "#0c68aa",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };

  return (
    <>
      <ChartTitle>Daily Revenue</ChartTitle>
      <Box className={classes.container}>
        <Bar data={data} width={100} height={250} options={options} />
      </Box>
    </>
  );
};

export default BarChart;