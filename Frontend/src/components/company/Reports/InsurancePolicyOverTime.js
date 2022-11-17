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

  function createData(id, policyName, avgPolicyValue, grossSales, totalSales) {
    return { id, policyName, avgPolicyValue, grossSales, totalSales };
  }

const csvData =[
    createData('#100','Renters insurance','$200.00','$450.00','$560.45'),
    createData('#156','Auto insurance','$260.55','$340.00','$600.10'),
    createData('#220','Boat insurance','$120.40','$212.00','$456.12'),
    createData('#267','Life insurance','$321.00','$546.00','$496.89'),
    createData('#278','Identity protection insurance','$146.20','$399.00','$458.45'),
    createData('#310','Business insurance','$400.00','$610.99','$798.99'),
    createData('#344','Homeowners insurance','$367.00','$467.00','$510.00'),
    createData('#345','RV insurance','$360.00','$345.00','$435.50'),
    createData('#379','Motorcycle insurance','$200.00','$450.00','$560.45'),
    createData('#379','Snowmobile insurance','$600.00','$700.00','$965.00'),
  ];

const InsurancePolicyOverTime = () => {
    return(
        <>
        {/* <Grid xs={10} md={5}> */}
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={csvData.toString()}>Export</CSVLink>
        </div>
        <br/>
            <div>
            <Line
                  data={{
                        labels: ['auto insurance', 'snowmobile insurance', 'motorcycle insurance', 'rv insurance', 'boat insurance', 'renters insurance', 'homeowners insurance', 'life insurance', 'business insurance', 'identity protection insurance', 'workplace protection insurance'],
                        datasets:[
                              {
                                  label:  'Insurance policies over time',
                                  data: [12, 19, 3, 5, 2, 3,16,8,4,6,7,8,9,10,3,12,20,9,12,24,30,19,10,22,45,50,25,30,35,25,40],
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
                                        labelString: "Total Orders",
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
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="right">Policy name</StyledTableCell>
                  <StyledTableCell align="right">Average policy cost</StyledTableCell>
                  <StyledTableCell align="right">Gross sales</StyledTableCell>
                  <StyledTableCell align="right">Total sales</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {csvData.map((csvData) => (
                  <StyledTableRow key={csvData.id}>
                    <StyledTableCell align="right">{csvData.id}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.policyName}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.avgPolicyValue}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.grossSales}</StyledTableCell>
                    <StyledTableCell align="right">{csvData.totalSales}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default InsurancePolicyOverTime;