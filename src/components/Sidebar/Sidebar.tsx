import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { LayoutDashboard, ArrowLeftRight, PieChart, Tag, Settings } from 'lucide-react'
import type { NavScreen } from '../BottomTabBar/BottomTabBar'

interface SidebarProps {
  current: NavScreen
  onNavigate: (screen: NavScreen) => void
  userName?: string
  userEmail?: string
  syncLabel?: string
}

const items: { id: NavScreen; label: string; Icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Visão geral', Icon: LayoutDashboard },
  { id: 'transactions', label: 'Movimentações', Icon: ArrowLeftRight },
  { id: 'reports', label: 'Relatórios', Icon: PieChart },
  { id: 'categories', label: 'Categorias', Icon: Tag },
  { id: 'settings', label: 'Ajustes', Icon: Settings },
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
        bgcolor: 'background.surface',
        borderRight: '1px solid rgba(26,24,21,0.08)',
        py: 5,
        px: 4,
        gap: 5,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 2 }}>
        <Box
          sx={(t) => ({
            width: 32,
            height: 32,
            borderRadius: t.shape.rounded.navItem,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Typography variant="brandIcon" component="span" color="inherit">
            p
          </Typography>
        </Box>
        <Typography variant="brandName" color="text.primary">
          pluma
        </Typography>
      </Box>

      {/* Nav */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map(({ id, label, Icon }) => {
          const active = current === id
          return (
            <Box
              key={id}
              component="button"
              onClick={() => onNavigate(id)}
              sx={(t) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                px: 3,
                py: 3,
                borderRadius: t.shape.rounded.navItem,
                border: 0,
                bgcolor: active ? 'rgba(61,107,79,0.12)' : 'transparent',
                color: active ? 'primary.dark' : 'text.secondary',
                textAlign: 'left',
                cursor: 'pointer',
                width: '100%',
                transition: 'background 120ms cubic-bezier(0.22,1,0.36,1)',
                '&:hover': {
                  bgcolor: active ? 'rgba(61,107,79,0.12)' : 'rgba(26,24,21,0.04)',
                },
              })}
            >
              <Icon size={18} strokeWidth={2} />
              <Typography
                component="span"
                variant="body2"
                sx={{ fontWeight: active ? 600 : 500, color: 'inherit' }}
              >
                {label}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* Bottom: sync + user */}
      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        <Box
          sx={(t) => ({
            p: 4,
            borderRadius: t.shape.rounded.md,
            bgcolor: 'background.paper',
            border: '1px solid rgba(26,24,21,0.08)',
            mb: 2,
          })}
        >
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Sincronizado
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={(t) => ({
                width: 8,
                height: 8,
                borderRadius: t.shape.rounded.circle,
                bgcolor: 'success.main',
                flexShrink: 0,
              })}
            />
            <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
              {syncLabel}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, px: 2, py: 3 }}>
          <Box
            sx={(t) => ({
              width: 32,
              height: 32,
              borderRadius: t.shape.rounded.circle,
              bgcolor: 'background.surfaceAvatar',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            })}
          >
            <Typography variant="brandIcon" component="span" color="text.primary">
              {initials}
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="labelSm"
              component="div"
              sx={{ fontWeight: 600, color: 'text.primary' }}
            >
              {userName}
            </Typography>
            {userEmail && (
              <Typography
                variant="caption"
                component="div"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
              >
                {userEmail}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
