import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Inbox } from 'lucide-react'
import { ExpenseRow } from '../ExpenseRow/ExpenseRow'
import { IncomeRow } from '../IncomeRow/IncomeRow'
import type { LucideIcon } from 'lucide-react'

export interface Transaction {
  id: string
  date: string
  name: string
  category: string
  account: string
  amount: number
  icon: LucideIcon
  iconColor: string
}

interface TransactionGroupProps {
  /** Transações já agrupadas por label de dia (ex: 'hoje', 'ontem', '20 mai') */
  groups: { dayLabel: string; transactions: Transaction[] }[]
  empty?: string
}

export function TransactionGroup({
  groups,
  empty = 'nenhuma transação por aqui',
}: TransactionGroupProps) {
  if (groups.length === 0 || groups.every(g => g.transactions.length === 0)) {
    return (
      <Card>
        <CardContent
          sx={{
            py: '48px !important',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Inbox size={32} color="#807a6c" strokeWidth={1.5} />
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {empty}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {groups.map(({ dayLabel, transactions }) => (
        <Box key={dayLabel}>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'lowercase',
              display: 'block',
              mb: 0.75,
              pl: 0.5,
            }}
          >
            {dayLabel}
          </Typography>
          <Card>
            <CardContent sx={{ p: { xs: '4px 16px 8px !important', sm: '4px 24px 8px !important' } }}>
              {transactions.map((t, idx) => {
                const isLast = idx === transactions.length - 1
                const props = {
                  name: t.name,
                  category: t.category,
                  account: t.account,
                  date: t.date,
                  amount: t.amount,
                  icon: t.icon,
                  iconColor: t.iconColor,
                  showDivider: !isLast,
                }
                return t.amount > 0
                  ? <IncomeRow key={t.id} {...props} />
                  : <ExpenseRow key={t.id} {...props} />
              })}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}
