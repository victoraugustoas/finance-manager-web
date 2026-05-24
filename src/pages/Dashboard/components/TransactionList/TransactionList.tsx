import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine } from 'lucide-react'
import { ExpenseRow } from '../../../../components/ExpenseRow/ExpenseRow.tsx'
import { IncomeRow } from '../../../../components/IncomeRow/IncomeRow.tsx'
import { TransferRow } from '../../../../components/TransferRow/TransferRow.tsx'
import { useTranslate } from '../../../../hooks/useTranslate.ts'
import type { TransactionListType } from './hooks/useTransactionList.ts'
import { useTransactionList } from './hooks/useTransactionList.ts'

interface TypeConfig {
  label: string
  icon: LucideIcon
  iconBg: string
  amountColor: string
}

export interface TransactionListProps {
  type: TransactionListType
  onSeeAll?: () => void
}

export function TransactionList({ type, onSeeAll }: TransactionListProps) {
  const result = useTransactionList(type)
  const { t } = useTranslate('dashboard')

  const TYPE_CONFIG: Record<TransactionListType, TypeConfig> = {
    income: {
      label: t('last_incomes'),
      icon: ArrowDownToLine,
      iconBg: '#3d6b4f',
      amountColor: '#2d6a4f',
    },
    expense: {
      label: t('last_expenses'),
      icon: ArrowUpFromLine,
      iconBg: '#c46a4e',
      amountColor: '#1a1a18',
    },
    transfer: {
      label: t('last_transfers'),
      icon: ArrowLeftRight,
      iconBg: '#4f7a9b',
      amountColor: '#5c5a54',
    },
  }
  const config = TYPE_CONFIG[type]

  function renderRows() {
    if (result.type === 'income') {
      return result.items.map((item, i) => (
        <IncomeRow
          key={item.id}
          name={item.name}
          category={item.categoryName}
          account={item.accountName}
          date={item.dueDate}
          amount={item.amount}
          icon={config.icon}
          showDivider={i < result.items.length - 1}
        />
      ))
    }

    if (result.type === 'expense') {
      return result.items.map((item, i) => (
        <ExpenseRow
          key={item.id}
          name={item.name}
          category={item.categoryName}
          account={item.accountName}
          date={item.dueDate}
          amount={item.amount}
          icon={config.icon}
          showDivider={i < result.items.length - 1}
        />
      ))
    }

    return result.items.map((item, i) => (
      <TransferRow
        key={item.id}
        name={item.name}
        from={item.accountOriginName}
        to={item.accountDestinationName}
        date={item.dueDate}
        amount={item.amount}
        showDivider={i < result.items.length - 1}
      />
    ))
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: '16px !important', sm: '24px !important' } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 2,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {config.label}
          </Typography>
          {onSeeAll && (
            <Box
              component="button"
              onClick={onSeeAll}
              sx={{
                bgcolor: 'transparent',
                border: 0,
                cursor: 'pointer',
                color: 'text.secondary',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                p: 0,
                '&:hover': { color: 'text.primary' },
              }}
            >
              Ver tudo →
            </Box>
          )}
        </Box>

        {result.isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px', py: '12px' }}>
                  <Skeleton
                    variant="rounded"
                    width={36}
                    height={36}
                    animation="wave"
                    sx={{ borderRadius: '10px', bgcolor: '#ede8de', flexShrink: 0 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Skeleton
                      variant="text"
                      width="55%"
                      animation="wave"
                      sx={{ fontSize: '0.875rem', bgcolor: '#ede8de' }}
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      animation="wave"
                      sx={{ fontSize: '0.75rem', bgcolor: '#ede8de' }}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width={72}
                    animation="wave"
                    sx={{ fontSize: '0.875rem', bgcolor: '#ede8de', flexShrink: 0 }}
                  />
                </Box>
                {i < 2 && <Divider />}
              </Box>
            ))
          : renderRows()}
      </CardContent>
    </Card>
  )
}
