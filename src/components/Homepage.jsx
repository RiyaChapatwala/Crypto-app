import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDataAsync } from '../reducers/reducerSlice';
import { Col, Row, Statistic, Typography } from 'antd';
import milify from 'millify'
import {Link} from 'react-router-dom'
import {Cryptocurrencies, News} from './index';
const Homepage = () => {
    const dispatch = useDispatch();
    const example = useSelector((state)=>state.data);
    const items = example?.list?.stats
    // console.log("example",items);

    useEffect(()=>{
        dispatch(getDataAsync({
            count : 10
        }))
    },[dispatch])
    
    return (
        <>
            <Typography.Title level={2} className="heading">Global Crypto State</Typography.Title>
            <Row>
               {items ? ( <>
                    <Col span={12}><Statistic title="Total Crypto Currency" value={items?.total} /></Col> 
                    <Col span={12}><Statistic title="Total Exchanges" value={milify(items?.totalExchanges)} /></Col> 
                    <Col span={12}><Statistic title="Total Market Cap" value={milify(items?.totalMarketCap)} /></Col> 
                    <Col span={12}><Statistic title="Total 24h Volume" value={milify(items?.total24hVolume)} /></Col> 
                    <Col span={12}><Statistic title="Total Markets" value={milify(items?.totalMarkets)} /></Col> 
                    </>
                    )
                    : <Typography.Text>Loading...</Typography.Text>
               }
            </Row>

            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Top 10 Cryptocurrencies in the world.
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show more</Link>
                </Typography.Title>
            </div>
            <Cryptocurrencies simplified />

            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">
                    Latest Crypto News
                </Typography.Title>
                <Typography.Title level={3} className="show-more">
                    <Link to="/news">Show more</Link>
                </Typography.Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
