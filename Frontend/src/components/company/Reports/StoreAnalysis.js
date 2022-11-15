import React from 'react';
import {Bar} from 'react-chartjs-2';
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

  function createData(month, sessions, storeVisits, filledForm) {
    return { month, sessions, storeVisits, filledForm };
  }

const csvData =[
    createData('Jan','13','55','24'),
    createData('Feb','25','23','23'),
    createData('Mar','10','49','13',),
    createData('Apr','22','52','47'),
    createData('May','46','67','40'),
    createData('Jun','32','40','29'),
    createData('Jul','82','101','51'),
    createData('Aug','66','60','17'),
    createData('Sept','89','35','31'),
    createData('Oct','74','99','89'),
    createData('Nov','73','74','58'),
  ];

const StoreAnalysis = () => {
    return(
        <>
        {/* <Grid xs={10} md={5}> */}
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={csvData.toString()}>Export</CSVLink>
        </div>
        <br/>
            <div>
            <Bar
                  data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Nov', 'Dec'],
                        datasets:[
                              {
                                  label:  'Store visits',
                                  data: [55,23,49,52,67,40,101,60,35,99,74],
                                  backgroundColor: '#0C68AA',
                                  borderWidth: 1
                              },
                              {
                                  label:  'Sessions',
                                  data: [13,25,10,22,46,32,82,66,89,74,73],
                                  backgroundColor: '#0C68AA',
                                  borderWidth: 1
                              },
                              {
                                  label:  'Form filled',
                                  data: [55,23,49,52,67,40,101,60,35,99,74],
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
                                        labelString: "Count",
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
                  <StyledTableCell align="right">Month</StyledTableCell>
                  <StyledTableCell align="right">Sessions</StyledTableCell>
                  <StyledTableCell align="right">Store visitor count</StyledTableCell>
                  <StyledTableCell align="right">Form submits</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((csvData) => (
                  <StyledTableRow key={csvData.month}>
                    <StyledTableCell align="right">{csvData.month}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.sessions}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.storeVisits}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.filledForm}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default StoreAnalysis;