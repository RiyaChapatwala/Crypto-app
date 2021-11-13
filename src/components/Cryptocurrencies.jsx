import { Card, Col, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataAsync } from './../reducers/reducerSlice';
// import Loader from './Loader'

const Cryptocurrencies = ({simplified}) => {

    const count = simplified ? 10 : 100;
    const dispatch = useDispatch();
    const items = useSelector((state)=>state.data)
    // console.log("items",items);
    
    const [cryptos , setCryptos] = useState();
    const [search , setSearch] = useState('');

    useEffect(()=>{
        dispatch(getDataAsync({count}))
    },[dispatch,count])

    useEffect(()=>{
        if(items.list && items.list.coins){
            const filteredData = items?.list?.coins.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()));
            setCryptos(filteredData)
        }
    },[ search , dispatch, items.list ])

    return (
        <>
        {!simplified && 
        <div className="search-crypto">
            <input type="text" placeholder=" search cryptocurrency" value={search} onChange={(e)=>setSearch(e.target.value)} />
        </div>}
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos ? cryptos.map((currency)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card title={`${currency.rank}.${currency.name}`}
                                 hoverable 
                                 extra={<img src={currency.iconUrl} alt="img" className="crypto-image"  />}>
                                <p>Price : {millify(currency.price)}</p>
                                <p>Market Cap : {millify(currency.marketCap)}</p>
                                <p>Daily change : {millify(currency.change)} %</p>
                            </Card>
                        </Link>
                    </Col>
                )) : <div>Loading..</div>
                }
            </Row>
        </>
    )
}

export default Cryptocurrencies
