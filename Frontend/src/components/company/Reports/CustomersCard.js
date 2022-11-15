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

const CustomersCard = () => {
    const classes = useStyles();
    return(
        <>
        <Grid item xs={12} sm={6} md={6}>
                <Paper className={classes.paper}>
                    <div className={classes.topRow}>
                    <div>
                        <Typography className={classes.green} variant="button">Customers</Typography> <br/>
                        <Typography>Gain insights into who your customers are and how they interact with your business.</Typography>
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
                                <Link to="customersovertime">Customers over time</Link><br/>
                                <Link to="onetimecustomers">One time customers</Link><br/>
                                <Link to="returningcustomers">Returning customers</Link><br/>
                                <Link to="loyalcustomers">Loyal customers</Link><br/>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Paper>
                </Grid>
        </>
    );
};

export default CustomersCard;