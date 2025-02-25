import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Usestate } from '../components/usestate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Usestate></Usestate>
  </StrictMode>,
)
