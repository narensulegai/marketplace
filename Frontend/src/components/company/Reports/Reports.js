import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { dashboardPageStyles } from "./styles/dashboardPage.styles";
import ReportCards from "./ReportCards";

const useStyles = makeStyles(dashboardPageStyles);

const Reports = () => {
  const classes = useStyles();
  return (
    <>
      <ReportCards />
    </>
  );
};

export default Reports;
