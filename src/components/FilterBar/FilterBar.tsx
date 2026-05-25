import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Search } from 'lucide-react'

export type TransactionFilter = 'all' | 'in' | 'out'

interface FilterBarProps {
  query: string
  onQueryChange: (q: string) => void
  filter: TransactionFilter
  onFilterChange: (f: TransactionFilter) => void
}

const filterOptions: { id: TransactionFilter; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'in', label: 'Entradas' },
  { id: 'out', label: 'Saídas' },
]

export function FilterBar({ query, onQueryChange, filter, onFilterChange }: FilterBarProps) {
  return (
    <Card>
      <CardContent
        sx={{
          p: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <OutlinedInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nome…"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <Search size={16} color="var(--mui-palette-text-disabled, #807a6c)" />
            </InputAdornment>
          }
          sx={(t) => ({
            flex: { sm: 1 },
            borderRadius: t.shape.rounded.md,
            fontSize: '0.875rem',
          })}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          {filterOptions.map(({ id, label }) => {
            const active = filter === id
            return (
              <Box
                key={id}
                component="button"
                onClick={() => onFilterChange(id)}
                sx={(t) => ({
                  height: 28,
                  px: 3,
                  borderRadius: t.shape.rounded.pill,
                  border: '1px solid',
                  borderColor: active ? 'transparent' : 'rgba(26,24,21,0.08)',
                  bgcolor: active ? 'primary.main' : 'background.surfaceInset',
                  color: active ? 'primary.contrastText' : 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 120ms cubic-bezier(0.22,1,0.36,1)',
                  whiteSpace: 'nowrap',
                })}
              >
                {label}
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}
