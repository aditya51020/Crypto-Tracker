import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../Context/CoinContext';
import LineChart from '../Components/LineChart';

const Coin = () => {
  const { coinid } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-N97JsSXzk3JqRpsD4jux3ixA' },
      });
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data: ", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, {
        method: 'GET',
        headers: { accept: 'application/json' },
      });
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCoinData();
      await fetchHistoricalData();
    };
    fetchData();
  }, [currency, coinid]);

  if (!coinData || !historicalData) {
    return (
      <div className='flex justify-center items-center min-h-[80vh]'>
        <div
          className='w-[65px] h-[65px] border-[4px] border-t-[#bdbdbd] border-transparent rounded-full animate-spin'>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 sm:p-6 md:p-8 lg:px-12'>
      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mb-6'>
        {coinData?.image?.large && (
          <img className='w-16 h-16 sm:w-24 sm:h-24' src={coinData.image.large} alt={`${coinData.name}`} />
        )}
        <div>
          <p className='text-white text-lg sm:text-xl font-bold'>
            {coinData?.name || 'Unknown'} ({coinData?.symbol?.toUpperCase() || 'N/A'})
          </p>
        </div>
      </div>

      <div className='mb-8'>
        {historicalData?.prices && <LineChart historicalData={historicalData.prices} />}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-white font-semibold'>Crypto Market Rank</h3>
          <p className='text-white'>{coinData.market_cap_rank}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-white font-semibold'>Current Price</h3>
          <p className='text-white'>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-white font-semibold'>Market Cap</h3>
          <p className='text-white'>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-white font-semibold'>24 Hr High</h3>
          <p className='text-white'>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded-lg'>
          <h3 className='text-white font-semibold'>24 Hr Low</h3>
          <p className='text-white'>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
