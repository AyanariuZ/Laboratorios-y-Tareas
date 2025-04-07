import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Videogames from './Videogames.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Videogames></Videogames>
  </StrictMode>,
)
