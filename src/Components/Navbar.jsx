import React, { useContext } from 'react'
import { CoinContext } from '../Context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const {setCurrency} = useContext(CoinContext)

    const currencyHandler = (e) => {
        switch(e.target.value){
            case 'usd':{
                setCurrency({name: 'usd', symbol: '$'})
                break
            }
            case 'eur':{
                setCurrency({name: 'eur', symbol: '€'})
                break
            }
                
            case 'inr':{
                setCurrency({name: 'inr', symbol: '₹'})
                break
            }
                
            default:{
                setCurrency({name: 'usd', symbol: '$'})
            }
    }
}
  return (
    <div className="flex justify-between items-center p-5 text-white font-semibold">
       <Link to={'/'}>
       <h1 className='font-bold lg:text-3xl md:text-2xl'>Cyr PO</h1> 
       </Link>
      <ul className='flex justify-between items-center gap-4 cursor-pointer'>
      <Link to={'/'}>
      <li>Home</li>
      </Link>
      </ul>

      <div className='text-black font-semibold '>
        <select onChange={currencyHandler}
        className='p-2 rounded-lg outline-none'>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
      </div>
    </div>
  )
}

export default Navbar
