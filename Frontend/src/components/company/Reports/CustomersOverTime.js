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
import {Bar} from 'react-chartjs-2';

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

function createData(date, count) {
  return { date, count };
}

const rows = [
  createData('Nov 13','4'),
  createData('Nov 14','1'),
  createData('Nov 15','3'),
  createData('Nov 16','6'),
  createData('Nov 17','2'),
  createData('Nov 18','6'),
  createData('Nov 19','4'),
 ];

const CustomersOverTime = () => {
    return(
        <>
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0c68aa",textTransform:"uppercase"}} data={rows.toString()}>Export</CSVLink>
        </div><br/>

        <Bar
                  data={{
                        labels: ['Nov 1-7' , 'Nov 8-14', 'Nov 15-19'],
                        datasets:[
                              {
                                  label:  'visitors',
                                  data: [4, 5, 8, 10, 25, 18, 11, 16, 20, 9, 9],
                                  backgroundColor: '#0c68aa',
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
                                        labelString: "Visitor count",
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
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">No. of visitors</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.count}</StyledTableCell>
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

export default CustomersOverTime;