import Box from '@mui/material/Box'
import { useState } from 'react'
import { FilterBar } from '../components/FilterBar/FilterBar'
import { TransactionGroup } from '../components/TransactionGroup/TransactionGroup'
import { TRANSACTIONS, groupByDay } from '../mocks/data'

export function TransactionsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all')

  const filtered = TRANSACTIONS.filter(t => {
    if (filter === 'in'  && t.amount < 0) return false
    if (filter === 'out' && t.amount > 0) return false
    if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FilterBar query={query} onQueryChange={setQuery} filter={filter} onFilterChange={setFilter} />
      <TransactionGroup groups={groupByDay(filtered)} />
    </Box>
  )
}
