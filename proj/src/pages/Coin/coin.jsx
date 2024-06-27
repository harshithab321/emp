import React, { useContext, useEffect,useState } from 'react'
import './coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import Linechart from '../../components/linechart/Line'

const Coin = () => {

const{coinId}=useParams();

const[coinData,setCoinData]=useState();
const[historicaldata,setHistoricalData]=useState();
const{currency}=useContext(CoinContext);



const fetchCoinData=async()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-eC6kbbdemhz55B5Tqb2ELnYj'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    .then(response => response.json())
    .then(response => setCoinData(response))
    .catch(err => console.error(err));
}

const fetchHistoricalData=async()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-eC6kbbdemhz55B5Tqb2ELnYj'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
    .then(response => response.json())
    .then(response => setHistoricalData(response))
    .catch(err => console.error(err));
}
 

useEffect(()=>{
 fetchCoinData();
 fetchHistoricalData();
},[currency])


console.log(historicaldata)
if(coinData){
  return (
    <div className='coin'>
       <div className="coin-name">
        <img src={coinData.image.large} alt=""/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
       </div>
      <div className='coin-chart'>
        <Linechart historicaldata={historicaldata} />
      </div>
      <div className='coin-info'>
        <ul>
          <li>crypto market rank</li>
          <li>{coinData.market_cap_rank} </li>
        </ul>
        <ul>
          <li>crypto market rank</li>
          <li>{currency.Symbol} {coinData.market_data.current_price
          [currency.name].toLocaleString()} </li>
        </ul>
        <ul>
          <li> market cap</li>
          <li>{currency.Symbol} {coinData.market_data.market_cap
          [currency.name].toLocaleString()} </li>
        </ul> 
        <ul>
          <li>24 hour high</li>
          <li>{currency.Symbol} {coinData.market_data.high_24h
          [currency.name].toLocaleString()} </li>
        </ul>
        <ul>
          <li>24 hour low</li>
          <li>{currency.Symbol} {coinData.market_data.low_24h
          [currency.name].toLocaleString()} </li>
        </ul>
      </div>


    </div>
  )
}
else{
  return (
    <div className='spinner'>
     <div className="spin"></div>
    </div>
  )
}
 
}


export default Coin