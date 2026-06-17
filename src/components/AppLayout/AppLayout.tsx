import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import type { NavScreen } from '../BottomTabBar/BottomTabBar'
import { BottomTabBar } from '../BottomTabBar/BottomTabBar'
import { MonthSelector } from '../MonthSelector/MonthSelector.tsx'
import { Sidebar } from '../Sidebar/Sidebar'
import { useMonthlyDate } from '../../hooks/useMonthlyDate.ts'
import { useTranslate } from '../../hooks/useTranslate.ts'

const PATH_TO_SCREEN: Record<string, NavScreen> = {
  '/': 'dashboard',
  '/transactions': 'transactions',
  '/reports': 'reports',
  '/categories': 'categories',
  '/settings': 'settings',
}

const SCREEN_TO_PATH: Record<NavScreen, string> = {
  dashboard: '/',
  transactions: '/transactions',
  reports: '/reports',
  categories: '/categories',
  settings: '/settings',
}

const SCREEN_TITLES: Record<NavScreen, string> = {
  dashboard: 'seu mês até agora',
  transactions: 'movimentações',
  reports: 'relatórios',
  categories: 'categorias',
  settings: 'ajustes',
}

interface AppLayoutProps {
  userName?: string
  userEmail?: string
}

export function AppLayout({ userName, userEmail }: AppLayoutProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { selectedMonth } = useMonthlyDate()
  const { formatDate } = useTranslate()

  const screen =
    (Object.entries(PATH_TO_SCREEN).find(([path]) =>
      path === '/' ? pathname === path : pathname.startsWith(path),
    )?.[1] as NavScreen | undefined) ?? 'dashboard'
  const selectedMonthLabel = formatDate(selectedMonth, { formatStr: 'MMMM' })

  function handleNavigate(s: NavScreen) {
    navigate(SCREEN_TO_PATH[s])
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar
        current={screen}
        onNavigate={handleNavigate}
        userName={userName}
        userEmail={userEmail}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          p: { xs: 4, sm: 5, md: 6 },
          pb: { xs: '108px', md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'flex-start' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="pageTitle" component="h1" color="text.primary">
                  {SCREEN_TITLES[screen]}
                </Typography>
                {screen === 'dashboard' && (
                  <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {selectedMonthLabel} · sincronizado há 2 minutos
                  </Typography>
                )}
              </Box>

              {screen === 'dashboard' && <MonthSelector />}
            </Box>

            <Outlet />
          </Box>
        </Box>
      </Box>

      <BottomTabBar current={screen} onNavigate={handleNavigate} />
    </Box>
  )
}
