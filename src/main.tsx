import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { plumaTheme } from './theme/pluma'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={plumaTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
