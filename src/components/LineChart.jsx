import React from 'react'
import { Col, Row, Typography } from 'antd';
import {Line} from 'react-chartjs-2'

const LineChart = ({currentPrice , coinName , coinHistory}) => {
    const coinPrice = [];
    const cointimeStamp = [];

    for(let i = 0;i<coinHistory?.history?.length; i+=1){
        coinPrice.push(coinHistory?.history[i]?.price)
        cointimeStamp.push(new Date(coinHistory?.history[i]?.timestamp).toLocaleDateString())
    }
    const data = {
        labels: cointimeStamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <>
        <Row className="chart-header">
            <Typography.Title className="chart-title" level={3}>{coinName} Price chart
            </Typography.Title>
            <Col className="price-container">
                <Typography.Title className="price-change" level={5}>
                    {coinHistory?.change} %
                </Typography.Title>
                <Typography.Title className="current-price" level={5}>
                    Current {coinName} Price : ${currentPrice} 
                </Typography.Title>
            </Col>  
        </Row>
        <Line data = {data} options={options} />
        </>
    )
}

export default LineChart
