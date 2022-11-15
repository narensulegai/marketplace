import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CSVLink} from 'react-csv';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#0C68AA",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

function createData(id, date, customer, policyPurchased) {
    return { id, date, customer, policyPurchased };
}

const rows = [
    createData('#100','Jan 06, 2022','fruit bowl','renters insurance'),
    createData('#156','Jan 15, 2022','paris baguette ','homeowners insurnace'),
    createData('#220','Mar 23, 2022','dai tung phai','identity protection insurnace'),
    createData('#267','Mar 24, 2022','DoWork workplaces','renters insurnace'),
    createData('#278','Mar 25, 2022','Fresh veg inc','renters insurnace'),
    createData('#310','Apr 12, 2022','LUNA kitchen','identity protection insurnace'),
    createData('#344','Apr 22, 2022','MCD Auto services','identity protection insurnace'),
    createData('#345','Apr 30, 2022','Food shop','renters insurnace'),
    createData('#379','May 06, 2022','Recycle bookstore','renters insurnace'),
    createData('#400','May 23, 2022','Sunny body shops inc','renters insurance'),
   ];

export default function OneTimeCustomers() {
  return (
    <>
    <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={rows.toString()}>Export</CSVLink>
        </div><br/>
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Customer</StyledTableCell>
            <StyledTableCell align="right">Policy purchased</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
              <StyledTableCell align="right">{row.customer}</StyledTableCell>
              <StyledTableCell align="right">{row.policyPurchased}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}