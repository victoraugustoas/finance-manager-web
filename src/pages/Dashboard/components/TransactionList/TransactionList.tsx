import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
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
  const theme = useTheme()

  const TYPE_CONFIG: Record<TransactionListType, TypeConfig> = {
    income: {
      label: t('last_incomes'),
      icon: ArrowDownToLine,
      iconBg: theme.palette.success.main,
      amountColor: theme.palette.success.main,
    },
    expense: {
      label: t('last_expenses'),
      icon: ArrowUpFromLine,
      iconBg: theme.palette.error.main,
      amountColor: theme.palette.text.primary,
    },
    transfer: {
      label: t('last_transfers'),
      icon: ArrowLeftRight,
      iconBg: theme.palette.categoryColors.transport,
      amountColor: theme.palette.text.secondary,
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
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 4,
          }}
        >
          <Typography variant="h2">{config.label}</Typography>
          {onSeeAll && (
            <Typography
              variant="labelSm"
              component="button"
              onClick={onSeeAll}
              sx={{
                bgcolor: 'transparent',
                border: 0,
                cursor: 'pointer',
                color: 'text.secondary',
                p: 0,
                '&:hover': { color: 'text.primary' },
              }}
            >
              Ver tudo →
            </Typography>
          )}
        </Box>

        {result.isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 3 }}>
                  <Skeleton
                    variant="rounded"
                    width={36}
                    height={36}
                    animation="wave"
                    sx={(t) => ({
                      borderRadius: t.shape.rounded.navItem,
                      bgcolor: 'background.surfaceInset',
                      flexShrink: 0,
                    })}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Skeleton
                      variant="text"
                      width="55%"
                      animation="wave"
                      sx={(t) => ({ ...t.typography.body2, bgcolor: 'background.surfaceInset' })}
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      animation="wave"
                      sx={(t) => ({ ...t.typography.caption, bgcolor: 'background.surfaceInset' })}
                    />
                  </Box>
                  <Skeleton
                    variant="text"
                    width={72}
                    animation="wave"
                    sx={(t) => ({
                      ...t.typography.body2,
                      bgcolor: 'background.surfaceInset',
                      flexShrink: 0,
                    })}
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
