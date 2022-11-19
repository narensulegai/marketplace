import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    color: "#0c68aa",
  },
}));

const ChartTitle = (props) => {
  const classes = useStyles();
  return (
    <Typography
      color="#0c68aa"
      className={classes.root}
      component="h2"
      variant="h4"
      align="center"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
};

export default ChartTitle;