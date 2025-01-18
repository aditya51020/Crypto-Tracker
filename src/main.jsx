import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/tailwind.css'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import CoinContextProvider from './Context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 

      <CoinContextProvider>
        <App />
      </CoinContextProvider>
      
    </BrowserRouter>
  </StrictMode>,
)
