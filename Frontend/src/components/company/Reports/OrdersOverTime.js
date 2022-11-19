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
import {Bar, Line} from 'react-chartjs-2';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0c68aa",
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

function createData(month, customerType, customers) {
  return { month, customerType, customers };
}

const rows = [
  createData('Jan 2022','returning customer','22'),
  createData('Jan 2022','first-time customer','4'),
  createData('Feb 2022','returning customer','15'),
  createData('Feb 2022','first-time customer','5'),
  createData('Mar 2022','returning customer','8'),
  createData('Mar 2022','first-time customer','8'),
  createData('Apr 2022','returning customer','12'),
  createData('Apr 2022','first-time customer','10'),
  createData('May 2022','returning customer','34'),
  createData('May 2022','first-time customer','25'),
  createData('Jun 2022','returning customer','35'),
  createData('Jun 2022','first-time customer','18'),
  createData('Jul 2022','returning customer','16'),
  createData('Jul 2022','first-time customer','11'),
  createData('Aug 2022','returning customer','26'),
  createData('Aug 2022','first-time customer','16'),
  createData('Sept 2022','returning customer','20'),
  createData('Sept 2022','first-time customer','20'),
  createData('Oct 2022','returning customer','27'),
  createData('Oct 2022','first-time customer','9'),
  createData('Nov 2022','returning customer','11'),
  createData('Nov 2022','first-time customer','9'),
 ];

const OrdersOverTime = () => {
    return(
        <>
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={rows.toString()}>Export</CSVLink>
        </div><br/>

        <Bar
                  data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'],
                        datasets:[
                              {
                                  label:  'first-time customers',
                                  data: [4, 5, 8, 10, 25, 18, 11, 16, 20, 9, 9],
                                  backgroundColor: '#0C68AA',
                                  borderWidth: 1
                              },
                              {
                                  label:  'returning customers',
                                  data: [22, 15, 8, 12, 34, 35, 16, 26, 20, 27, 11],
                                  backgroundColor: '#0C68AA',
                                  borderWidth: 1
                              },
                        ],
                  }}
                  height={400}
                  width={1000}
                  options={{
                        scales:{
                              yAxes:[{
                                scaleLabel: {
                                        display: true,
                                        labelString: "Customers count",
                                        fontSize: 18,
                                    },
                                    ticks:{
                                          beginAtZero:true,
                                    }
                              }],
                              xAxes: [
                                    {
                                    scaleLabel: {
                                        display: true,
                                        fontSize: 18,
                                    },
                                    },
                                ],
                        }
                  }}
            />



            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Month</StyledTableCell>
                  <StyledTableCell align="right">Customer type</StyledTableCell>
                  <StyledTableCell align="right">Customers</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.month}>
                    <StyledTableCell align="right">{row.month}</StyledTableCell>
                    <StyledTableCell align="right">{row.customerType}</StyledTableCell>
                    <StyledTableCell align="right">{row.customers}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        {/* </Grid> */}
        {/* <SalesOverTimeTable /> */}
        </>
    );
};

export default OrdersOverTime;