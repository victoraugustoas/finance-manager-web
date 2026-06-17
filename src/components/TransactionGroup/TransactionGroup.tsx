import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { Inbox } from 'lucide-react'
import { ExpenseRow } from '../ExpenseRow/ExpenseRow'
import { IncomeRow } from '../IncomeRow/IncomeRow'
import { TransferRow } from '../TransferRow/TransferRow'
import type { LucideIcon } from 'lucide-react'

export interface Transaction {
  id: string
  kind?: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  date: string
  name: string
  category: string
  account: string
  amount: number
  icon: LucideIcon
  iconColor: string
  from?: string
  to?: string
}

interface TransactionGroupProps {
  groups: { dayLabel: string; transactions: Transaction[] }[]
  empty?: string
}

export function TransactionGroup({
  groups,
  empty = 'nenhuma transação por aqui',
}: TransactionGroupProps) {
  const theme = useTheme()

  if (groups.length === 0 || groups.every((g) => g.transactions.length === 0)) {
    return (
      <Card>
        <CardContent
          sx={{
            py: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Inbox size={32} color={theme.palette.text.disabled} strokeWidth={1.5} />
          <Typography variant="body2" color="text.disabled">
            {empty}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {groups.map(({ dayLabel, transactions }) => (
        <Box key={dayLabel}>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'lowercase',
              display: 'block',
              mb: 2,
              pl: 1,
            }}
          >
            {dayLabel}
          </Typography>
          <Card>
            <CardContent sx={{ p: { xs: '4px 16px 8px', sm: '4px 24px 8px' } }}>
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
                if (t.kind === 'TRANSFER') {
                  return (
                    <TransferRow
                      key={t.id}
                      name={t.name}
                      from={t.from ?? 'Origem'}
                      to={t.to ?? 'Destino'}
                      date={t.date}
                      amount={t.amount}
                      icon={t.icon}
                      iconColor={t.iconColor}
                      showDivider={!isLast}
                    />
                  )
                }

                return t.amount > 0 ? (
                  <IncomeRow key={t.id} {...props} />
                ) : (
                  <ExpenseRow key={t.id} {...props} />
                )
              })}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}
