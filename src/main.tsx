import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {NextUIProvider} from '@nextui-org/react'
import './index.css'
import { ThemeProvider } from './context/theme.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ThemeProvider>
    <NextUIProvider>
    <main className="text-foreground bg-background">
      <App />
      </main>
    </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
