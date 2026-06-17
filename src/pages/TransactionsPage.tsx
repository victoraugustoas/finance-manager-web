import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { FilterBar, type TransactionFilter } from '../components/FilterBar/FilterBar'
import { MonthSelector } from '../components/MonthSelector/MonthSelector.tsx'
import { TransactionGroup } from '../components/TransactionGroup/TransactionGroup'
import { useTranslate } from '../hooks/useTranslate.ts'
import { useStatementController } from './Transactions/hooks/useStatementController.ts'

function SummaryCard({
  label,
  amount,
  tone = 'primary',
  isLoading,
}: {
  label: string
  amount: number
  tone?: 'primary' | 'success' | 'error'
  isLoading: boolean
}) {
  const { formatMoney } = useTranslate()

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="caption" component="div" color="text.disabled">
          {label}
        </Typography>
        {isLoading ? (
          <Skeleton
            variant="text"
            width={120}
            sx={(theme) => ({ ...theme.typography.amountMd, bgcolor: 'background.surfaceInset' })}
          />
        ) : (
          <Typography variant="amountMd" component="div" color={`${tone}.main`} sx={{ mt: 1 }}>
            {formatMoney(amount, 'BRL')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export function TransactionsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<TransactionFilter>('all')
  const { groups, summary, isLoading } = useStatementController(query, filter)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: { sm: 'flex-end' } }}>
        <MonthSelector />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        <SummaryCard label="Saldo inicial" amount={summary.initialBalance} isLoading={isLoading} />
        <SummaryCard
          label="Entradas"
          amount={summary.income}
          tone="success"
          isLoading={isLoading}
        />
        <SummaryCard label="Saídas" amount={summary.outgo} tone="error" isLoading={isLoading} />
        <SummaryCard label="Saldo final" amount={summary.finalBalance} isLoading={isLoading} />
      </Box>

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        filter={filter}
        onFilterChange={setFilter}
      />

      {isLoading ? (
        <Card>
          <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 4, py: 3 }}>
                <Skeleton
                  variant="rounded"
                  width={36}
                  height={36}
                  sx={(theme) => ({
                    borderRadius: theme.shape.rounded.navItem,
                    bgcolor: 'background.surfaceInset',
                  })}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="50%" sx={{ bgcolor: 'background.surfaceInset' }} />
                  <Skeleton width="35%" sx={{ bgcolor: 'background.surfaceInset' }} />
                </Box>
                <Skeleton width={80} sx={{ bgcolor: 'background.surfaceInset' }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      ) : (
        <TransactionGroup groups={groups} empty="nenhuma movimentação no extrato" />
      )}
    </Box>
  )
}
