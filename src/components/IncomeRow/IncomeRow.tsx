import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'

interface IncomeRowProps {
  name: string
  category: string
  account: string
  date: string
  amount: number
  icon: LucideIcon
  iconColor?: string
  showDivider?: boolean
}

function fmtMoney(n: number) {
  return `+R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function IncomeRow({
  name,
  category,
  account,
  date,
  amount,
  icon: Icon,
  iconColor = '#3d6b4f',
  showDivider = true,
}: IncomeRowProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          py: '12px',
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: iconColor,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={18} strokeWidth={2} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
          <Typography variant="caption">
            {date} · {category} · {account}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '0.875rem',
            fontFeatureSettings: '"tnum" 1',
            color: 'success.main',
            flexShrink: 0,
          }}
        >
          {fmtMoney(amount)}
        </Typography>
      </Box>

      {showDivider && <Divider />}
    </>
  )
}
