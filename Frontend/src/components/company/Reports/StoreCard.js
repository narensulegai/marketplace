import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider } from "@material-ui/core";
import { reportStatCardStyles } from "./styles/reportStatCardStyles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';

const useStyles = makeStyles(reportStatCardStyles);

const StoreCard = () => {
    const classes = useStyles();
    return(
        <>
        <Grid item xs={15} sm={8} md={8}>
                <Paper className={classes.paper}>
                    <div className={classes.topRow}>
                    <div>
                        <Typography className={classes.green} variant="button">Website analysis</Typography> <br/>
                        <Typography>Gain insights into your website, what factors are influencing your website's functionality and how to improve your website's outreach.</Typography>
                        {/* <Typography variant="h4" 
                        onload={(e) => {
                        }}>{totalVisitors}</Typography> */}
                    </div>
                    <div className={classes.icon}>
                        <StorefrontRoundedIcon fontSize="large" />
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
                                <Link to="storeanalysis">Online website analysis</Link><br/>
                                <Link to="topstoresearches">Top online store searches</Link><br/>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </Paper>
                </Grid>
        </>
    );
};

export default StoreCard;