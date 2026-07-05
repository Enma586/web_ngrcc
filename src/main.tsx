import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          borderRadius: '12px',
          padding: '12px 16px',
        },
      }}
    />
    <App />
  </StrictMode>,
)
