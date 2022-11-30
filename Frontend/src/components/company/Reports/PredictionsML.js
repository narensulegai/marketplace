import React from 'react';
import {Line} from 'react-chartjs-2';
import {CSVLink} from 'react-csv';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    return {date, count };
  }

const csvData =[
    createData('13 Nov','5'),
    createData('14 Nov','2'),
    createData('15 Nov','2'),
    createData('16 Nov','4'),
    createData('17 Nov','5'),
    createData('18 Nov','2'),
    createData('19 Nov','2'),
  ];

const PredictionsML = () => {
    return(
        <>
        {/* <Grid xs={10} md={5}> */}
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0c68aa",textTransform:"uppercase"}} data={csvData.toString()}>Export</CSVLink>
        </div>
        <br/>
            <div>
            <Line
                  data={{
                        labels: ['Nov 1-7', 'Nov 8-14','Nov 15-19'],
                        datasets:[
                              {
                                  label:  'Premium predictions by ML engine',
                                  data: [5,2,2,4,5,2,2],
                                  backgroundColor: '#0c68aa',
                                  borderWidth: 1,
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
                                        labelString: "Premium predictions",
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
        </div>
        <br/>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">No. of predictions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((csvData) => (
                  <StyledTableRow key={csvData.date}>
                    <StyledTableCell align="right">{csvData.date}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.count}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default PredictionsML;