import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../Context/CoinContext';
import { Link } from 'react-router-dom';

//Utility function to abbreviate large numbers
const abbreviateNumber = (num) => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B'; // Billions
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M'; // Millions
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2) + 'K'; // Thousands
  } else {
    return num.toLocaleString(); // Small numbers, no abbreviation
  }
};

const Homepage = () => {

  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);

  const [input, setInput] = useState(''); // Search input

  // this part is for search functionality
  const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value === '') {
      setDisplayCoins(allCoins);
    }
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
     return item.name.toLowerCase().includes(input.trim().toLowerCase())
    })
    setDisplayCoins(coins);
  }
// search functionality end here

useEffect(() => {
  if (Array.isArray(allCoins) && displayCoins.length === 0) {
    setDisplayCoins(allCoins);
  }
}, [allCoins]);

  return (
    <>
      <div className='flex flex-col items-center justify-center text-white gap-4 p-4 w-full'>
        <div className='text-center mt-8 py-6'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
            Largest <br /> Crypto Marketplace
          </h1>
          <p className='m-4 text-base sm:text-lg md:text-xl font-semibold'>
            Welcome to the world's largest cryptocurrency marketplace.
          </p>

          <form onSubmit={searchHandler}
          className='flex flex-wrap sm:flex-nowrap justify-between items-center gap-2 sm:gap-4
        mt-6 border rounded-full p-2 bg-white w-full sm:w-3/1 '>

            <input onChange={inputHandler} value={input}
              list='coinlist' type="text"
              placeholder='Search crypto'
              className='outline-none text-sm sm:text-base text-gray-400 px-3 flex-grow'
             required/>

             <datalist id='coinlist'>
              {allCoins.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
             </datalist>

            <button
              className='border rounded-full p-2 px-4 font-semibold text-sm sm:text-base '
              style={{ background: "#eeaeca" }}
              type='submit'>
              Search
            </button>
          </form>
        </div>

      </div>

      {/* crypto table strat here */}
      <div className='max-w-5xl mx-auto p-4 border rounded-lg bg-white transparent-70'>
  {/* Table Header */}
   <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-2 sm:gap-4 border-b-2 border-gray-400 py-4 px-2 text-black'>
    <p className='text-sm md:text-base font-bold text-left'>#</p>
    <p className='text-sm md:text-base font-bold'>Coins</p>
    <p className='text-sm md:text-base font-bold'>Price</p>
    <p className='text-sm md:text-base font-bold'>24H Change</p>
    <p className='text-sm md:text-base font-bold text-right'>Market Cap</p>
  </div>

  {/* Table Rows */}
  {displayCoins.slice(0, 10).map((item, index) => (
    
        <Link to={`/coin/${item.id}`}
          key={item.id}
          className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] 
          gap-2 sm:gap-4 items-center border-b border-gray-300 py-3 px-2 text-black'>
          
          {/* Rank */}
          <p className='text-sm md:text-base text-left'>{item.market_cap_rank}</p>
          
          {/* Coin Name and Symbol */}
          <div className='flex items-center gap-2'>
            <img src={item.image} alt={item.name} className='w-6 h-6' />
            <div>
              <p className='text-sm md:text-base font-medium'>{item.name}</p>
              <p className='text-xs text-gray-500'>{item.symbol.toUpperCase()}</p>
            </div>
          </div>
          
          {/* Price */}
          <p className='text-sm md:text-base'>
            {currency.symbol} {item.current_price.toLocaleString()}
          </p>
          
          {/* 24H Change */}
          <p
            className={`text-sm md:text-base ${
              item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
            {Math.floor(item.price_change_percentage_24h * 100) / 100}%
          </p>
          
          {/* Market Cap */}
          <p className='text-sm md:text-base sm:text-xs text-right'>
            {currency.symbol} {abbreviateNumber(item.market_cap)}
          </p>
        </Link>
      ))}
    </div>
      {/* crypto table end here */}
    </>
  )
}

export default Homepage
