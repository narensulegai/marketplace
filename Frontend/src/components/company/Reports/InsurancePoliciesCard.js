import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { reportStatCardStyles } from "./styles/reportStatCardStyles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";

const useStyles = makeStyles(reportStatCardStyles);

const InsurancePoliciesCard = () => {
    const classes = useStyles();
    return(
        <>
        <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper}>
                    <div className={classes.topRow}>
                    <div>
                        <Typography className={classes.green} variant="button">Insurance Polices</Typography> <br/>
                        <Typography>Get a sense of your store's policy order volume and flow, as well as overall fulfillment performance, with orders reports.</Typography>
                        {/* <Typography variant="h4" 
                        onload={(e) => {
                        }}>{totalVisitors}</Typography> */}
                    </div>
                    </div><br/>
                    <Divider />
                    <p style={{textAlign:"left",marginTop:"5px", marginLeft:"5px",textTransform:"uppercase"}}>Reports</p>
                    <div className={classes.bottomRow}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography style={{color:'#3F51B5'}}>Show All</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                <Link to="ordersovertime">Policy orders over time</Link><br/>
                                <Link to="policymetrics">Policy metrics</Link><br/>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Paper>
                </Grid>
        </>
    );
};

export default InsurancePoliciesCard;