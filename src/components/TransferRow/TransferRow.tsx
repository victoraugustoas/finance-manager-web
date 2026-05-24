import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeftRight } from 'lucide-react'
import { useFormatDateTransactions } from '../../hooks/useFormatDateTransactions.ts'

export interface TransferRowProps {
  name: string
  from: string
  to: string
  date: string
  amount: number
  icon?: LucideIcon
  iconColor?: string
  showDivider?: boolean
}

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function TransferRow({
  name,
  from,
  to,
  date,
  amount,
  icon: Icon = ArrowLeftRight,
  iconColor = '#4f7a9b',
  showDivider = true,
}: TransferRowProps) {
  const { fmtDate } = useFormatDateTransactions()
  const dateFormatted = fmtDate(date)
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
            {dateFormatted} · {from} → {to}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
            fontFeatureSettings: '"tnum" 1',
            color: 'text.secondary',
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
