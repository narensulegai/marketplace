import React from 'react';
import {Line} from 'react-chartjs-2';
import {CSVLink} from 'react-csv';
import csvData from './data/csvData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

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
  
  function createData(id,policyName,policyType,totalSales) {
    return { id,policyName,policyType,totalSales };
  }
  const rows = [
    createData('#100','Auto insurance','vehicle','$560.45'),
    createData('#156','Snowmobile insurance','vehicle','$600.10'),
    createData('#220','Motorcycle insurance','vehicle','$456.12'),
    createData('#267','rv insurance','vehicle','$496.89'),
    createData('#278','Boat insurance','vehicle','$458.45'),
    createData('#310','Renters insurance','vehicle','$798.99'),
    createData('#344','Homeowners insurance','property','$510.00'),
    createData('#345','Life insurance','life','$435.50'),
    createData('#379','Business insurance','business','$560.45'),
    createData('#400','Identity protection insurance','identity','$980.00'),
    createData('#400','Workplace protection insurance','workplace','$980.00'),
   ];
const SalesByPolicy = () => {
    return(
        <>
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={csvData.toString()}>Export</CSVLink>
        </div><br/>
            <div>
            <Line
                  data={{
                        labels: ['auto insurance', 'snowmobile insurance', 'motorcycle insurance', 'rv insurance', 'boat insurance', 'renters insurance', 'homeowners insurance', 'life insurance', 'business insurance', 'identity protection insurance', 'workplace protection insurance'],
                        datasets:[
                              {
                                  label:  'Sales by Policy',
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
                                        labelString: "Total Sales",
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
                                        labelString: "Policy type",
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
                  <StyledTableCell align="right">Policy type</StyledTableCell>
                  <StyledTableCell align="right">Total sales</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.policyName}</StyledTableCell>
                    <StyledTableCell align="right">{row.policyType}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalSales}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default SalesByPolicy;