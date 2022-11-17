import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid} from "@material-ui/core";
import { reportStatCardStyles } from "./styles/reportStatCardStyles";
import { useState } from 'react';
import SalesCard from "./SalesCard";
import CustomersCard from "./CustomersCard";
import StoreCard from "./StoreCard";
import InsurancePoliciesCard from "./InsurancePoliciesCard";

const useStyles = makeStyles(reportStatCardStyles);

const ReportCards = () => {
  const classes = useStyles();
  const [totalVisitors, setTotalVisitors] = useState(Math.floor(Math.random() * (2000 - 50) + 50));
  const [policiesSold, setPoliciesSold] = useState(Math.floor(Math.random() * (100 - 5) + 5));
  const [netProfit, setNetProfit] = useState(Math.floor(Math.random() * (5000 - 100) + 100));
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
            <SalesCard/>
            <InsurancePoliciesCard />
            <CustomersCard/>
            <StoreCard />
      </Grid>
    </div>
  );
};

export default ReportCards;