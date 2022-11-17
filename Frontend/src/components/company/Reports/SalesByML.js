import React from 'react';
import {Line} from 'react-chartjs-2';
import {CSVLink} from 'react-csv';
import csvData from './data/csvData';

const SalesByML = () => {
    return(
        <>
        <br/>
        <div style={{textAlign: "right"}}>
            <CSVLink style={{color:"#0C68AA",textTransform:"uppercase"}} data={csvData.toString()}>Export</CSVLink>
        </div><br/>
            <div>
            <Line
                  data={{
                        labels: ['kiev workplaces', 'general electronics shop', 'plaza para', 'fix it mobile', 'world market', 'marshalls', 'nikki traditions', 'tee nee thai'],
                        datasets:[
                              {
                                  label:  'Sales by ML based premium calculation',
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
                                        labelString: "Customers",
                                    },
                                    },
                                ],
                        }
                  }}
            />            
        </div>
        </>
    );
};

export default SalesByML;