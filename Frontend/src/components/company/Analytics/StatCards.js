import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { statCardsStyles } from "./styles/statCardsStyles";
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useState } from 'react';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';

const useStyles = makeStyles(statCardsStyles);

const StatCards = () => {
  const classes = useStyles();
  const [totalVisitors, setTotalVisitors] = useState(Math.floor(Math.random() * (10 - 1) + 1));
  // const [policiesSold, setPoliciesSold] = useState(Math.floor(Math.random() * (10 - 1) + 1));
  // const [netProfit, setNetProfit] = useState(Math.floor(Math.random() * (5000 - 100) + 100));
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={15} sm={8} md={4}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Total website Visitors</Typography>
                <Typography variant="h4" 
                onload={(e) => {
                }}>{totalVisitors}</Typography>
              </div>
              <div className={classes.icon}>
                <PeopleAltRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowUpwardIcon className={classes.green} />
              <Typography variant="body2">
                &nbsp;<span className={classes.green}>{Math.floor(Math.random() * (10 - 1) + 1)}%</span> to last week
              </Typography>
            </div>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Policies Sold</Typography>
                <Typography variant="h4" 
                onload={(e) => {
                }}>{policiesSold}</Typography>
              </div>
              <div className={classes.icon}>
                <StorefrontRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowDownwardIcon fontSize="small" className={classes.red} />
              <Typography variant="body2">
                &nbsp;<span className={classes.red}>{Math.floor(Math.random() * (100 - 1) + 1)}%</span> to last week
              </Typography>
            </div>
          </Paper>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Net Profit</Typography>
                <Typography variant="h4" 
                onload={(e) => {
                }}>${netProfit}</Typography>
              </div>
              <div className={classes.icon}>
                <MoneyRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowUpwardIcon fontSize="small" className={classes.green} />
              <Typography variant="body2">
                &nbsp;<span className={classes.green}>{(Math.random() * (100 - 1) + 1).toFixed(2)}%</span> to last week
              </Typography>
            </div>
          </Paper>
        </Grid> */}
        <Grid item xs={15} sm={8} md={4}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">ML based Premium Predictions</Typography>
                <Typography variant="h4">{Math.floor(Math.random() * (10 - 1) + 1)}</Typography>
              </div>
              <div className={classes.icon}>
                <TimelineRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowUpwardIcon fontSize="small" className={classes.green} />
              <Typography variant="body2">
                &nbsp;<span className={classes.green}>{(Math.random() * (10 - 1) + 1).toFixed(2)}%</span> to last week
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={15} sm={8} md={4}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Formula based Premium Predictions</Typography>
                <Typography variant="h4">{Math.floor(Math.random() * (10 - 1) + 1)}</Typography>
              </div>
              <div className={classes.icon}>
                <FunctionsRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowDownwardIcon fontSize="small" className={classes.green} />
              <Typography variant="body2">
                &nbsp;<span className={classes.green}>{Math.floor(Math.random() * (10 - 1) + 1)}%</span> to last week
              </Typography>
            </div>
          </Paper>
        </Grid>

        {/* <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Net Revenue</Typography>
                <Typography variant="h4">${Math.floor(Math.random() * (10000 - 1000) + 1000)}</Typography>
              </div>
              <div className={classes.icon}>
                <MonetizationOnRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              <ArrowUpwardIcon fontSize="small" className={classes.green} />
              <Typography variant="body2">
                &nbsp;<span className={classes.green}>{Math.floor(Math.random() * (100 - 1) + 1).toFixed(2)}</span> to last month
              </Typography>
            </div>
          </Paper>
        </Grid> */}

        <Grid item xs={15} sm={8} md={4}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Top selling policy</Typography>
                <Typography variant="h4">Medical Insurance</Typography>
              </div>
              <div className={classes.icon}>
                <StarsRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              {/* <ArrowUpwardIcon fontSize="small" className={classes.green} /> */}
              <Typography variant="body2">
                &nbsp;<span className={classes.green}></span>
              </Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={15} sm={8} md={4}>
          <Paper className={classes.paper}>
            <div className={classes.topRow}>
              <div>
                <Typography variant="button">Number of active chat sessions</Typography>
                <Typography variant="h4">{Math.floor(Math.random() * (10 - 1) + 1)}</Typography>
              </div>
              <div className={classes.icon}>
                <ForumRoundedIcon fontSize="large" />
              </div>
            </div>
            <Divider />
            <div className={classes.bottomRow}>
              {/* <ArrowUpwardIcon fontSize="small" className={classes.green} /> */}
              <Typography variant="body2">
                &nbsp;<span className={classes.green}></span>
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatCards;