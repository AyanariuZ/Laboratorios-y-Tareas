import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Manager from './Manager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Manager></Manager>
  </StrictMode>,
)
