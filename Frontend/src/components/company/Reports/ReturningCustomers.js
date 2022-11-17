import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CSVLink, CSVDownload} from 'react-csv';
import { Doughnut } from "react-chartjs-2";

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

function createData(name, email, day, policyPurchased) {
    return { name, email, day, policyPurchased };
}

const rows = [
    createData('kiev workplaces','kiev@gmail.com','Jan 06, 2022','renters insurance'),
    createData('plaza para ','plaza@gmail.com','Jan 15, 2022','homeowners insurnace'),
    createData('world market','worldmarket@outlook.com','Mar 23, 2022','identity protection insurnace'),
    createData('nikki traditions','nikki@outlook.com','Mar 24, 2022','renters insurnace'),
    createData('We Work inc','wework@gmail.com','Mar 25, 2022','renters insurnace'),
    createData('hoola hup foundations','hoola@gmail.com','Apr 12, 2022','identity protection insurnace'),
    createData('burgers&fries stop','burgers@gmail.com','Apr 22, 2022','identity protection insurnace'),
    createData('SVG Motors','svg@outlook.com','Apr 30, 2022','renters insurnace'),
    createData('Kennys corner','kenny@outlook.com','May 06, 2022','renters insurnace'),
    createData('Charlie body shop inc','charlie@outlook.com','May 23, 2022','renters insurance'),
   ];
   const data = {
    labels: ['kiev workplaces', 'plaza para', 'world market', 'nikki traditions', 'We Work inc', 'hoola hup foundations', 'burgers&fries stop', 'SVG Motors','Kennys corner','Charlie body shop inc'],
    datasets: [
      {
        data: [73, 17, 10, 78, 99, 23, 14, 55, 78, 62],
        backgroundColor: "#0C68AA",
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FEBF30", "#715749", "#EB852C", "#6FA59F", "#CFD22A", "#662578", "#E35D5D"],
      },
    ],
      };
    const options = {
    legend: {
      display: false,
    },
      };

export default function ReturningCustomers() {
  return (
    <>
    <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={rows.toString()}>Export</CSVLink>
        </div><br/>

        <div>
            <Doughnut data={data} options={options}
            />            
        </div>
    <br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer name</StyledTableCell>
            <StyledTableCell align="right">Customer email</StyledTableCell>
            <StyledTableCell align="right">First policy purchase date</StyledTableCell>
            <StyledTableCell align="right">Policy purchased</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.day}</StyledTableCell>
              <StyledTableCell align="right">{row.policyPurchased}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}