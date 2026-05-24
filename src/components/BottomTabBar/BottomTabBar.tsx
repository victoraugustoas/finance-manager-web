import Box from '@mui/material/Box'
import { LayoutDashboard, ArrowLeftRight, Plus, PieChart, User } from 'lucide-react'

export type NavScreen = 'dashboard' | 'transactions' | 'reports' | 'categories' | 'settings'

interface BottomTabBarProps {
  current: NavScreen
  onNavigate: (screen: NavScreen) => void
  onAdd: () => void
}

const tabs = [
  { id: 'dashboard' as NavScreen,    icon: LayoutDashboard, label: 'início' },
  { id: 'transactions' as NavScreen, icon: ArrowLeftRight,   label: 'movim.' },
  { id: 'reports' as NavScreen,      icon: PieChart,         label: 'relat.' },
  { id: 'settings' as NavScreen,     icon: User,             label: 'perfil' },
]

export function BottomTabBar({ current, onNavigate, onAdd }: BottomTabBarProps) {
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 20,
        left: 16,
        right: 16,
        height: 72,
        borderRadius: '28px',
        bgcolor: 'rgba(255, 253, 248, 0.88)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(26,24,21,0.08)',
        boxShadow: '0 8px 32px -8px rgba(26,24,21,0.12)',
        alignItems: 'center',
        justifyContent: 'space-around',
        px: 1.5,
        zIndex: 1200,
      }}
    >
      {tabs.slice(0, 2).map(tab => (
        <TabButton key={tab.id} tab={tab} active={current === tab.id} onNavigate={onNavigate} />
      ))}

      {/* Botão central de adicionar */}
      <Box
        component="button"
        onClick={onAdd}
        sx={{
          width: 52,
          height: 52,
          borderRadius: '18px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          border: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 14px -4px rgba(61,107,79,0.5)',
          transition: 'transform 120ms cubic-bezier(0.22,1,0.36,1)',
          '&:active': { transform: 'scale(0.95)' },
        }}
      >
        <Plus size={22} strokeWidth={2} />
      </Box>

      {tabs.slice(2).map(tab => (
        <TabButton key={tab.id} tab={tab} active={current === tab.id} onNavigate={onNavigate} />
      ))}
    </Box>
  )
}

function TabButton({
  tab,
  active,
  onNavigate,
}: {
  tab: (typeof tabs)[number]
  active: boolean
  onNavigate: (s: NavScreen) => void
}) {
  const Icon = tab.icon
  return (
    <Box
      component="button"
      onClick={() => onNavigate(tab.id)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        bgcolor: 'transparent',
        border: 0,
        cursor: 'pointer',
        color: active ? 'primary.dark' : 'text.disabled',
        p: '4px 6px',
        minWidth: 48,
        transition: 'color 120ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <Icon size={20} strokeWidth={2} />
      <Box component="span" sx={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.02em' }}>
        {tab.label}
      </Box>
    </Box>
  )
}
