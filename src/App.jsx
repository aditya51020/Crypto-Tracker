import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Coin from './Pages/Coin.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'


function App() {

  return (

    <div className="App min-h-screen"
      style={{ background: "black" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/coin/:coinid" element={<Coin/>} />
        {/* <Route path="/contact" component={Contact} /> */}
      </Routes>
      <Footer />
    </div>

  )
}

export default App
