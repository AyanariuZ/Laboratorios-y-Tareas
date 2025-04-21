import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cifrado from './components/CifradoTexto.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cifrado />
  </StrictMode>,
)
