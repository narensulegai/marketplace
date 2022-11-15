import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Hidden,
} from "@material-ui/core";
import ChartTitle from "./ChartTitle";
import { orders } from "./data/recentBuyers";
import { recentBuyersTableStyles } from "./styles/recentBuyersTable.styles";

const createData = (id, customer, date, address) => {
  return { id, customer, date, address };
};

const createRows = () => {
  let rows = [];
  orders.forEach((order) => {
    rows.push(createData(order.id, order.customer, order.date, order.address));
  });
  return rows;
};

const rows = createRows();

const useStyles = makeStyles(recentBuyersTableStyles);

const DeliveryOrdersTable = ({ history, match }) => {
  const classes = useStyles();

  return (
    <>
      <ChartTitle>Recent buyers</ChartTitle>
      <Table className={classes.root} size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.head}>ID</TableCell>
            <TableCell className={classes.head}>Customer</TableCell>
            <Hidden xsDown>
              <TableCell className={classes.head}>Date</TableCell>
              <TableCell className={classes.head}>Address</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className={classes.row}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.customer}</TableCell>
              <Hidden xsDown>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.address}</TableCell>
              </Hidden>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DeliveryOrdersTable;