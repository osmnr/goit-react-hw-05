import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
