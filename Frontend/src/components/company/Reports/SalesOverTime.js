import React from 'react';
import {Line} from 'react-chartjs-2';
import {CSVLink} from 'react-csv';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles} from '@material-ui/core/styles';

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

  function createData(id,date,orders,grossSales,cancelledPolicies,netSales,totalSales) {
    return { id,date,orders,grossSales,cancelledPolicies,netSales,totalSales };
  }
  const rows = [
    createData('#100','Jan 06, 2022','20','$200.00','3','$450.00','$560.45'),
    createData('#156','Jan 15, 2022','24','$260.55','10','$340.00','$600.10'),
    createData('#220','Mar 23, 2022','14','$120.40','4','$212.00','$456.12'),
    createData('#267','Mar 24, 2022','12','$321.00','7','$546.00','$496.89'),
    createData('#278','Mar 25, 2022','06','$146.20','12','$399.00','$458.45'),
    createData('#310','Apr 12, 2022','28','$400.00','15','$610.99','$798.99'),
    createData('#344','Apr 22, 2022','15','$367.00','8','$467.00','$510.00'),
    createData('#345','Apr 30, 2022','56','$360.00','7','$345.00','$435.50'),
    createData('#379','May 06, 2022','13','$200.00','3','$450.00','$560.45'),
    createData('#400','May 23, 2022','20','$100.00','8','$560.00','$980.00'),
   ];

const SalesOverTime = () => {
    return(
        <>
        {/* <Grid xs={10} md={5}> */}
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={rows.toString()}>Export</CSVLink>
        </div>
        <br/>
            <div>
            <Line
                  data={{
                        labels: ['Oct 14','Oct 15','Oct 16','Oct 17','Oct 18','Oct 19','Oct 20','Oct 21','Oct 22','Oct 23','Oct 24','Oct 25','Oct 26','Oct 27','Oct 28','Oct 29','Oct 30','Oct 31','Nov 1','Nov 2',
                                'Nov 3','Nov 4','Nov 5','Nov 6','Nov 7','Nov 8','Nov 9','Nov 10','Nov 11','Nov 12'],
                        datasets:[
                              {
                                  label:  'Sales by time',
                                  data: [1200, 1900, 300, 500, 200, 300,1600,800,400,600,700,800,900,1000,300,1200,200,900,120,240,300,1900,100,220,450,500,2500,300,3500,2500,400],
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
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Orders</StyledTableCell>
                  <StyledTableCell align="right">Gross Sales</StyledTableCell>
                  <StyledTableCell align="right">Cancelled policies</StyledTableCell>
                  <StyledTableCell align="right">Net sales</StyledTableCell>
                  <StyledTableCell align="right">Total sales</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.orders}</StyledTableCell>
                    <StyledTableCell align="right">{row.grossSales}</StyledTableCell>
                    <StyledTableCell align="right">{row.cancelledPolicies}</StyledTableCell>
                    <StyledTableCell align="right">{row.netSales}</StyledTableCell>
                    <StyledTableCell align="right">{row.totalSales}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default SalesOverTime;