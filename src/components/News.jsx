import React, { useState , useEffect} from 'react'
import moment from 'moment'
import {useGetCryptoNewsQuery} from '../services/GetCryptoNews'
import { Row , Col, Card, Avatar } from 'antd';
import { Typography, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAsync } from './../reducers/reducerSlice';
const News = ({simplified}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDataAsync({count : 10}))
    },[dispatch])

    const {Option} = Select;
    const [newsCategory , setNewsCategory] = useState("Cryptocurrency")

    const {data : cryptoNews} = useGetCryptoNewsQuery({newsCategory , count : simplified ? 5 : 12 })
    const {data} = useSelector(state=>state)

    // console.log("news",cryptoNews);


    if(!cryptoNews?.value) return <div> Loading...</div>

    return (
        <div>
            <Row gutter = {[24,24]} >
                {!simplified &&    
                <Col span={24}> 
                    <Select
                        showSearch
                        placeholder="search a crypto"
                        className="select-news"
                        onChange={(value)=>setNewsCategory(value)}
                        optionFilterProp="children"
                        filterOption={(input, option)=>option.children.toLowerCase.indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Ethereum">
                        Ethereum
                        </Option>
                        {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
                }
                {cryptoNews.value.map((news, i)=>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Typography.Title  className="news-title" level={4}>
                                        {news.name}
                                    </Typography.Title>
                                    <img style={{maxWidth:"200px" , maxHeight:"100px"}} src={news?.image?.thumbnail?.contentUrl} alt="logo" />
                                </div>
                                    <p>{news.description > 100 ? `${news.description.substring(0,100)}` : news.description} </p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="logo" />
                                            <Typography.Text>{news.provider[0]?.name}</Typography.Text>
                                        </div>
                                            <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                                    </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default News
