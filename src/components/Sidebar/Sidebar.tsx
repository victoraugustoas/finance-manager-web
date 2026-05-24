import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Tag,
  Settings,
} from 'lucide-react'
import type { NavScreen } from '../BottomTabBar/BottomTabBar'

interface SidebarProps {
  current: NavScreen
  onNavigate: (screen: NavScreen) => void
  userName?: string
  userEmail?: string
  syncLabel?: string
}

const items: { id: NavScreen; label: string; Icon: React.ElementType }[] = [
  { id: 'dashboard',    label: 'Visão geral',   Icon: LayoutDashboard },
  { id: 'transactions', label: 'Movimentações', Icon: ArrowLeftRight },
  { id: 'reports',      label: 'Relatórios',    Icon: PieChart },
  { id: 'categories',  label: 'Categorias',    Icon: Tag },
  { id: 'settings',    label: 'Ajustes',       Icon: Settings },
]

export function Sidebar({
  current,
  onNavigate,
  userName = 'Você',
  userEmail = '',
  syncLabel = 'há 2 min',
}: SidebarProps) {
  const initials = userName.charAt(0).toUpperCase()

  return (
    <Box
      component="aside"
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        width: 220,
        flexShrink: 0,
        bgcolor: '#fbf8f2',
        borderRight: '1px solid rgba(26,24,21,0.08)',
        p: '24px 16px',
        gap: 3,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '10px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Fraunces", Georgia, serif',
            fontWeight: 500,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
          }}
        >
          p
        </Box>
        <Typography
          sx={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontWeight: 500,
            fontSize: '1.375rem',
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          pluma
        </Typography>
      </Box>

      {/* Nav */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {items.map(({ id, label, Icon }) => {
          const active = current === id
          return (
            <Box
              key={id}
              component="button"
              onClick={() => onNavigate(id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: '12px',
                py: '10px',
                borderRadius: '10px',
                border: 0,
                bgcolor: active ? 'rgba(61,107,79,0.12)' : 'transparent',
                color: active ? 'primary.dark' : 'text.secondary',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '0.875rem',
                fontWeight: active ? 600 : 500,
                textAlign: 'left',
                cursor: 'pointer',
                width: '100%',
                transition: 'background 120ms cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  bgcolor: active ? 'rgba(61,107,79,0.12)' : 'rgba(26,24,21,0.04)',
                },
              }}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </Box>
          )
        })}
      </Box>

      {/* Bottom: sync + user */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Box
          sx={{
            p: '14px',
            borderRadius: '14px',
            bgcolor: 'background.paper',
            border: '1px solid rgba(26,24,21,0.08)',
            mb: 1,
          }}
        >
          <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
            Sincronizado
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.8125rem', color: 'text.secondary' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.main',
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              {syncLabel}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, px: 1, py: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: '#d9cfb8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 500,
              color: '#2a2723',
              fontSize: '1rem',
              flexShrink: 0,
            }}
          >
            {initials}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: 'text.primary' }}>
              {userName}
            </Typography>
            {userEmail && (
              <Typography variant="caption" sx={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userEmail}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
