import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[amount,SetAmount]=useState("")
  const[FromCurrency,SetFromCurrency]=useState("USD")
  const[ToCurrency,SetToCurrency]=useState("INR")
  const[convertedamount,SetConvertedAmount]=useState("")
  const[exchangerate,SetExchangerate]=useState("")


  useEffect(()=>{
    getExchangerate()
  },[FromCurrency,ToCurrency])

  useEffect(()=>{
    if(exchangerate!==null){
      SetConvertedAmount((amount*exchangerate).toFixed(2))
    }

  },[amount,exchangerate])

  const getExchangerate=async()=>{
    try{
      let Response= await axios.get(`https://api.exchangerate-api.com/v4/latest/${FromCurrency}`)
      SetExchangerate(Response.data.rates[ToCurrency])

    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
    <div className='container'>
      <div className='box'></div>
      <div className='data'>
        <h1>CURRENCY-CONVERTER</h1>

        <div className='inputs'>
          <label htmlFor='amount'>Amount</label>
          <input id='amount' placeholder='Enter The Amount'  value={amount}
          onChange={(e)=>SetAmount(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
          />
        </div>
        <div className='inputs'>
          <label htmlFor='fromcurrency'>FromCurrency</label>
          <select id='fromcurrency' value={FromCurrency}
          onChange={(e)=>SetFromCurrency(e.target.value)}
          >
           <option value="INR">INR-Indian Rupees</option>
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japenese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinease yuan</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South Affrican Rand</option>
          </select>
        </div>
        <div className='inputs'>
          <label htmlFor='tocurrency'>ToCurrency</label>
          <select id='tocurrency' value={ToCurrency}
            onChange={(e)=>SetToCurrency(e.target.value)}
          >
            <option value="USD">USD-United States Dollar</option>
            <option value="EUR">EUR-Euro</option>
            <option value="GBP">GBP-British Pound Sterling</option>
            <option value="JPY">JPY-Japenese Yen</option>
            <option value="AUD">AUD-Australian Dollar</option>
            <option value="CAD">CAD-Canadian Dollar</option>
            <option value="CNY">CNY-Chinease yuan</option>
            <option value="INR">INR-Indian Rupees</option>
            <option value="BRL">BRL-Brazilian Real</option>
            <option value="ZAR">ZAR-South Affrican Rand</option>
          </select>
        </div>
        <div className='result'><p>{amount} {FromCurrency} IS EQUAL TO {convertedamount}{ToCurrency}</p></div>

      </div>
      <p>Designed By:<a href='https://www.linkedin.com/in/dison-t-20241a315/'>Dison dys</a></p>
    </div>
    </>
  );
}

export default App;
