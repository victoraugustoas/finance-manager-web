import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeftRight } from 'lucide-react'
import { useFormatDateTransactions } from '../../hooks/useFormatDateTransactions.ts'
import { useTranslate } from '../../hooks/useTranslate.ts'

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

export function TransferRow({
  name,
  from,
  to,
  date,
  amount,
  icon: Icon = ArrowLeftRight,
  iconColor = 'categoryColors.transport',
  showDivider = true,
}: TransferRowProps) {
  const { fmtDate } = useFormatDateTransactions()
  const { formatMoney } = useTranslate()
  const dateFormatted = fmtDate(date)

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 3 }}>
        <Box
          sx={(t) => ({
            width: 36,
            height: 36,
            borderRadius: t.shape.rounded.navItem,
            bgcolor: iconColor,
            color: 'common.white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          })}
        >
          <Icon size={18} strokeWidth={2} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="rowTitle"
            component="div"
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {name}
          </Typography>
          <Typography variant="caption">
            {dateFormatted} · {from} → {to}
          </Typography>
        </Box>

        <Typography
          variant="rowAmount"
          component="div"
          color="text.secondary"
          sx={{ flexShrink: 0 }}
        >
          {formatMoney(amount, 'BRL')}
        </Typography>
      </Box>

      {showDivider && <Divider />}
    </>
  )
}
