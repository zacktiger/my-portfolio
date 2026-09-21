import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { profile, socials } from './data/site.js'

// A note for whoever opens DevTools.
console.log(
  `%ckb.%c  Poking around? The source is at ${socials.find((s) => s.label === 'GitHub').href}/my-portfolio
` +
    `If you're hiring: ${profile.email}`,
  'font: italic 28px Georgia, serif; color: #d9480f',
  'font: 12px ui-monospace, monospace; color: inherit',
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
