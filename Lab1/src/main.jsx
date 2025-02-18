import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyApp } from './MyApp.jsx'
import { HolaMundo } from './HolaMundo.jsx'
import { Variables } from './Variables.jsx'
import { Import } from './Import.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HolaMundo></HolaMundo>
    <Variables></Variables>
    <Import></Import>
  </StrictMode>,
)
