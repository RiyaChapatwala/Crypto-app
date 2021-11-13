import { Avatar, Col, Collapse, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getExchanges } from './../reducers/reducerSlice';
import { useSelector } from 'react-redux';
import  milify  from 'millify';
import  HTMLReactParser  from 'html-react-parser';

const Exchanges = () => {
    const dispatch = useDispatch()
    const {exchangeData} = useSelector((state)=>state?.data) 
    console.log(exchangeData?.data?.exchanges,"hii");

    useEffect(()=>{
        dispatch(getExchanges())
    },[dispatch])

    if(!exchangeData || !exchangeData?.data?.exchanges){
        return <div>Loading...</div>
    }
    const list = exchangeData?.data?.exchanges;

  return (
      <>
    <Row>
      <Col span={6}>Exchanges</Col>
      <Col span={6}>24h Trade Volume</Col>
      <Col span={6}>Markets</Col>
      <Col span={6}>Change</Col>
    </Row>
    <Row>
        {list && list.map((item)=>(
            <Col span={24}>
                <Collapse>
                    <Collapse.Panel key={item.id} 
                        showArrow={false}
                        header={(
                            <Row>
                                <Col span={6}>
                                    <Typography.Text>{item.rank}</Typography.Text>
                                    <Avatar className="exchange-image" src={item.iconUrl}></Avatar>
                                    <Typography.Text>{item.name}</Typography.Text>

                                </Col>
                                <Col span={6}>$ {milify(item.volume)}</Col>
                                <Col span={6}>{milify(item.numberOfMarkets)}</Col>
                                <Col span={6}>{milify(item.marketShare)}</Col>
                            </Row>
                        )}
                        >
                           {HTMLReactParser(item.description || '')}
                    </Collapse.Panel>
                </Collapse>
            </Col>
        ))}

    </Row>
    </>
  );
};

export default Exchanges;
