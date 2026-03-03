import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Auto-import all CSS files in /styles
const styleModules = import.meta.glob("./styles/**/*.css", { eager: true });

Object.values(styleModules);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
