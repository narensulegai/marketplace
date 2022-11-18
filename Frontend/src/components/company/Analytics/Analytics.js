import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { Paper, Grid } from "@material-ui/core";
import { dashboardPageStyles } from "./styles/dashboardPage.styles";
import StatCards from "./StatCards";
import RecentBuyersTable from "./RecentBuyersTable";
import DoughnutChart from "./DoughnutChart";

const useStyles = makeStyles(dashboardPageStyles);

const Analytics = () => {
  const classes = useStyles();
  return (
    <>
      <StatCards />
      <Paper className={classes.root} elevation={5}>
        <LineChart />
      </Paper>
      {/* <Paper className={classes.root} elevation={5}>
        <BarChart />
      </Paper> */}
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs={12} md={8}>
          <Paper elevation={5}>
            <RecentBuyersTable />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <Paper elevation={5}>
            <DoughnutChart />
          </Paper>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Analytics;
