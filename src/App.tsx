import { AppRouter } from './routes/AppRouter'
import { plumaTheme } from './theme/pluma.ts'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

export default function App() {
  return (
    <ThemeProvider theme={plumaTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}
