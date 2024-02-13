import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import '/bootstrap.min (1).css'
import ContextShare from './Context/ContextShare.jsx'
import TokenAuth from './Context/TokenAuth.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <TokenAuth>
  <ContextShare>
  <BrowserRouter> <App /> </BrowserRouter>
  </ContextShare>
  </TokenAuth>
  </React.StrictMode>,
)
