import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContext.jsx'
import { SidebarProvider } from './components/SidebarContext.jsx'
import "./styles/theme.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>,
)