import Box from '@mui/material/Box'
import { CardIncomeOutgo } from '../../components/CardIncomeOutgo/CardIncomeOutgo.tsx'
import { CardTotalBalance } from './components/CardTotalBalance/CardTotalBalance.tsx'
import { CategoryBreakdown } from './components/CategoryBreakdown/CategoryBreakdown.tsx'
import { INCOME, OUTGO } from '../../mocks/data.ts'
import { ListAccounts } from './components/ListAccounts/ListAccounts.tsx'
import { TransactionList } from './components/TransactionList/TransactionList.tsx'

export function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <CardTotalBalance />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 2fr' },
          gap: 2,
        }}
      >
        <CardIncomeOutgo income={INCOME} outgo={OUTGO} />
        <ListAccounts />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 2 }}>
        <CategoryBreakdown type="EXPENSE" />
        <CategoryBreakdown type="INCOME" />

        <TransactionList type="income" />
        <TransactionList type="expense" />
        <TransactionList type="transfer" />
      </Box>
    </Box>
  )
}
