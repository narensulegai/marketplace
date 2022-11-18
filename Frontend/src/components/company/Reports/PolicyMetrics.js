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

function createData(name, timesSold, latest) {
    return { name, timesSold, latest };
}

const rows = [
    createData('motorcycle insurance','54','Jan 06, 2022'),
    createData('auto insurance ','66','Jan 15, 2022'),
    createData('business insurance','12','Mar 23, 2022'),
    createData('snowmobile insurance','5','Mar 24, 2022'),
    createData('rv insurance','11','Mar 25, 2022'),
    createData('boat insurance','3','Apr 12, 2022'),
    createData('renters insurance','79','Apr 22, 2022'),
    createData('homeowners insurance','94','Apr 30, 2022'),
    createData('life insurance','35','May 06, 2022'),
    createData('identity protection insurance','15','May 23, 2022'),
    createData('workplace protection insurance','18','May 23, 2022'),
   ];
   const data = {
    labels: ['auto insurance', 'snowmobile insurance', 'motorcycle insurance', 'rv insurance', 'boat insurance', 'renters insurance', 'homeowners insurance', 'life insurance', 'business insurance', 'identity protection insurance', 'workplace protection insurance'],
    datasets: [
      {
        data: [73, 17, 10, 78, 99, 23, 14, 55, 78, 62],
        backgroundColor: "#0C68AA",
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FEBF30", "#715749", "#EB852C", "#6FA59F", "#CFD22A", "#662578", "#E35D5D", "#68ABB9"],
      },
    ],
      };
    const options = {
    legend: {
      display: false,
    },
      };

export default function PolicyMetrics() {
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
            <StyledTableCell>Policy name</StyledTableCell>
            <StyledTableCell align="right">Number of times sold</StyledTableCell>
            <StyledTableCell align="right">Latest policy purchase date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.timesSold}</StyledTableCell>
              <StyledTableCell align="right">{row.latest}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}