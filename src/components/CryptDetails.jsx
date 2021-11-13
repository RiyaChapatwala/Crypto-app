import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleDataAsync, getCryptoHistory } from "../reducers/reducerSlice";
import { Typography, Col, Select, Row } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";

const CryptDetails = () => {
  const { coinId } = useParams();
  const dispatch = useDispatch();
  const [timePeriod, setTimePeriod] = useState("7d");
  // const [cryptoDetails , setCryptoDetails] = useState()
  const { singleData, historyData } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getSingleDataAsync({ coinId }));
    dispatch(getCryptoHistory({ coinId, timePeriod }));
  }, [dispatch, coinId, timePeriod]);

  
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  
  const cryptoDetails = singleData?.coin;
  if (!singleData || !historyData ||!cryptoDetails) {
    return <div>NO Data</div>;
  }
  console.log("singkle", singleData);
  console.log("history", historyData);

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    // <></>
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Typography.Title className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.slug}) Prices
        </Typography.Title>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select a timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((period) => (
          <Select.Option key={period}>{period}</Select.Option>
        ))}
      </Select>

      <LineChart
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
        coinHistory={historyData}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Typography.Title className="coin-details-heading">
              {cryptoDetails.name} Value Statictics
            </Typography.Title>
            <p>An overview showing the stats of {cryptoDetails.name} </p>
          </Col>
          {stats.map(({ title, icon, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>
        <Col className="stats-container">
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Typography.Title className="coin-details-heading">
                Other Statictics
              </Typography.Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ title, icon, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className="stats">{value}</Typography.Text>
              </Col>
            ))}
          </Col>
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Text className="coin-detail-heading">
            What is {cryptoDetails.name}?
            {HTMLReactParser(cryptoDetails.description)}
          </Typography.Text>
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Typography.Title>
          {cryptoDetails.links.map((link) => (
            <Row key={link.name} className="coin-link">
              <Typography.Title level={5} className="link-name">
                {link.type}
              </Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptDetails;
