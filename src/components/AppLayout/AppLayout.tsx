import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import type { NavScreen } from '../BottomTabBar/BottomTabBar'
import { BottomTabBar } from '../BottomTabBar/BottomTabBar'
import { Sidebar } from '../Sidebar/Sidebar'

const PATH_TO_SCREEN: Record<string, NavScreen> = {
  '/':             'dashboard',
  '/transactions': 'transactions',
  '/reports':      'reports',
  '/categories':   'categories',
  '/settings':     'settings',
}

const SCREEN_TO_PATH: Record<NavScreen, string> = {
  dashboard:    '/',
  transactions: '/transactions',
  reports:      '/reports',
  categories:   '/categories',
  settings:     '/settings',
}

const SCREEN_TITLES: Record<NavScreen, string> = {
  dashboard:    'seu mês até agora',
  transactions: 'movimentações',
  reports:      'relatórios',
  categories:   'categorias',
  settings:     'ajustes',
}

interface AppLayoutProps {
  userName?: string
  userEmail?: string
  onAdd: () => void
}

export function AppLayout({ userName, userEmail, onAdd }: AppLayoutProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const screen = PATH_TO_SCREEN[pathname] ?? 'dashboard'

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
          p: { xs: 2, sm: 3, md: 4 },
          pb: { xs: '108px', md: 4 },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 500,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    letterSpacing: '-0.015em',
                    color: 'text.primary',
                    lineHeight: 1.1,
                  }}
                >
                  {SCREEN_TITLES[screen]}
                </Typography>
                {screen === 'dashboard' && (
                  <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                    maio · sincronizado há 2 minutos
                  </Typography>
                )}
              </Box>
              <Box
                component="button"
                onClick={onAdd}
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  alignItems: 'center',
                  gap: 0.75,
                  height: 44,
                  px: 2.25,
                  borderRadius: '12px',
                  border: 0,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&:active': { transform: 'scale(0.98)' },
                }}
              >
                + Adicionar
              </Box>
            </Box>

            <Outlet />
          </Box>
        </Box>
      </Box>

      <BottomTabBar current={screen} onNavigate={handleNavigate} onAdd={onAdd} />
    </Box>
  )
}
