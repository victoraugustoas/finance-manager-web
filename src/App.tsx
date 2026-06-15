import { AppRouter } from './routes/AppRouter'
import { plumaTheme } from './theme/pluma.ts'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MonthlyDateProvider } from './contexts/MonthlyDateProvider.tsx'
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={plumaTheme}>
        <CssBaseline />
        <MonthlyDateProvider>
          <AppRouter />
        </MonthlyDateProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
