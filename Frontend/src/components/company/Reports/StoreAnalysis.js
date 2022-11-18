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

  function createData(date, storeVisits, filledForm) {
    return { date, storeVisits, filledForm };
  }

const csvData =[
    createData('Nov 13','1','5'),
    createData('Nov 14','5','3'),
    createData('Nov 15','10','4'),
    createData('Nov 16','2','2'),
    createData('Nov 17','6','6'),
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
                        labels: ['Nov 1-7', 'Nov 8-14'],
                        datasets:[
                              {
                                  label:  'Website visits',
                                  data: [5,2,9,5,6,4,1,6,3,9,4],
                                  backgroundColor: '#0C68AA',
                                  borderWidth: 1
                              },
                              // {
                              //     label:  'Sessions',
                              //     data: [1,5,1,2,6,3,8,6,9,7,3],
                              //     backgroundColor: '#0C68AA',
                              //     borderWidth: 1
                              // },
                              {
                                  label:  'Form submissions',
                                  data: [5,2,4,2,7,4,10,6,3,9,7],
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
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Website visitor count</StyledTableCell>
                  <StyledTableCell align="right">Form submits</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((csvData) => (
                  <StyledTableRow key={csvData.date}>
                    <StyledTableCell align="right">{csvData.date}</StyledTableCell>
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