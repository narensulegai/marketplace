import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { reportStatCardStyles } from "./styles/reportStatCardStyles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';

const useStyles = makeStyles(reportStatCardStyles);

const CustomersCard = () => {
    const classes = useStyles();
    return(
        <>
        <Grid item xs={15} sm={8} md={8}>
                <Paper className={classes.paper}>
                    <div className={classes.topRow}>
                    <div>
                        <Typography className={classes.green} variant="button">Website Visitors</Typography> <br/>
                        <Typography>Gain insights into who your website visitors are and how they interact with your business.</Typography>
                        {/* <Typography variant="h4" 
                        onload={(e) => {
                        }}>{totalVisitors}</Typography> */}
                    </div>
                    <div className={classes.icon}>
                        <VisibilityRoundedIcon fontSize="large" />
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
                            <Typography style={{color:'#0c68aa'}}>Show All</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                <Link to="customersovertime">Website visitors over time</Link><br/>
                                {/* <Link to="onetimecustomers">One time customers</Link><br/> */}
                                {/* <Link to="returningcustomers">Returning customers</Link><br/> */}
                                {/* <Link to="loyalcustomers">Loyal customers</Link><br/> */}
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