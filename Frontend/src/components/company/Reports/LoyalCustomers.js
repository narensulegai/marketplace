import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import ReactApexChart from "react-apexcharts";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
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

function createData(customerName, customerEmail, firstOrderDate, lastOrderDate, ordersToDate) {
  return { customerName, customerEmail, firstOrderDate, lastOrderDate, ordersToDate };
}

const rows = [
  createData('kiev workplaces','kiev@outlook.com','09-01-2022','10-10-2022','06'),
  createData('genZ labs','genZ@outlook.com','07-26-2022','11-15-2022', '09'),
  createData('Lennar realtors','lennar@outlook.com','02-01-2022','03-10-2022', '22'),
  createData('General electronics shop','ge@gmail.com','04-18-2022','05-17-2022', '10'),
  createData('Marshalls','marshalls@outlook.com','09-12-2022','10-10-2022', '11'),
  createData('Plaza para','plazapara@outlook.com','01-01-2022','02-30-2022', '01'),
  createData('Fix it mobiles','fixit@outlook.com','05-11-2022','07-19-2022', '09'),
  createData('tee nee thai','teenee@outlook.com','03-24-2022','03-27-2022', '15'),
  createData('World market','wm@outlook.com','02-05-2022','09-19-2022', '07'),
  createData('Kogura & Co','kc@outlook.com','06-20-2022','07-05-2022', '09'),
  createData('GNC realtors','gnc@outlook.com','08-21-2022','09-21-2022', '03'),
  createData('AT&T','att@outlook.com','09-04-2022','10-30-2022', '12'),
  createData('Philz coffee','plilz@outlook.com','07-29-2022','08-28-2022', '10'),
 ];
const series = [
    {
        data: [
          {
            x: 'kiev workplaces',
            y: 218
          },
          {
            x: 'genZ labs',
            y: 149
          },
          {
            x: 'Lennar realtors',
            y: 184
          },
          {
            x: 'General electronics shop',
            y: 55
          },
          {
            x: 'Marshalls',
            y: 84
          },
          {
            x: 'Plaza para',
            y: 31
          },
          {
            x: 'Fix it mobiles',
            y: 70
          },
          {
            x: 'tee nee thai',
            y: 30
          },
          {
            x: 'World market',
            y: 44
          },
          {
            x: 'Kogura & Co',
            y: 68
          },
          {
            x: 'GNC realtors',
            y: 28
          },
          {
            x: 'AT&T',
            y: 19
          },
          {
            x: 'Philz coffee',
            y: 29
          }
        ]
      }
  ]
const LoyalCustomers = () => {

    const chartData = {
        legend: {
            show: false
          },
        chart: {
          type: "treemap",
          id: "apexchart-example",
          height: 350,
        },
        title: {
            text: 'Our loyal customers',
            align: 'center',
          },
          colors: [
            '#0C68AA'
          ],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          },
    }
    return(
        <>
        <br/><br/>
            <ReactApexChart options={chartData} series={series} type="treemap" width={1200} height={500} />
            <br/><br/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Customer name</StyledTableCell>
                  <StyledTableCell align="right">Customer email</StyledTableCell>
                  <StyledTableCell align="right">First policy purchase date</StyledTableCell>
                  <StyledTableCell align="right">Lastest policy purchase date</StyledTableCell>
                  <StyledTableCell align="right">Policies purchased to date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.customerName}>
                    <StyledTableCell align="right">{row.customerName}</StyledTableCell>
                    <StyledTableCell align="right">{row.customerEmail}</StyledTableCell>
                    <StyledTableCell align="right">{row.firstOrderDate}</StyledTableCell>
                    <StyledTableCell align="right">{row.lastOrderDate}</StyledTableCell>
                    <StyledTableCell align="right">{row.ordersToDate}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
        </>
    );
};

export default LoyalCustomers;