import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { useFormatDateTransactions } from '../../hooks/useFormatDateTransactions.ts'
import { useTranslate } from '../../hooks/useTranslate.ts'

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

export function IncomeRow({
  name,
  category,
  account,
  date,
  amount,
  icon: Icon,
  iconColor = 'success.main',
  showDivider = true,
}: IncomeRowProps) {
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
            {dateFormatted} · {category} · {account}
          </Typography>
        </Box>

        <Typography variant="rowAmount" component="div" color="success.main" sx={{ flexShrink: 0 }}>
          +{formatMoney(amount, 'BRL')}
        </Typography>
      </Box>

      {showDivider && <Divider />}
    </>
  )
}
