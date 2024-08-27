import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{
      display:'flex',
      justifyContent:'center',
      minHeight: '100vh',
      backgroundColor : '#0E0E0E'

    }}><App></App></div>
  </StrictMode>,
)
