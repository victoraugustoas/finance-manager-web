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
  { id: 'in',  label: 'Entradas' },
  { id: 'out', label: 'Saídas' },
]

export function FilterBar({ query, onQueryChange, filter, onFilterChange }: FilterBarProps) {
  return (
    <Card>
      <CardContent
        sx={{
          p: { xs: '12px !important', sm: '16px !important' },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <OutlinedInput
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder="Buscar por nome…"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <Search size={16} color="var(--mui-palette-text-disabled, #807a6c)" />
            </InputAdornment>
          }
          sx={{
            flex: { sm: 1 },
            borderRadius: '12px',
            fontSize: '0.875rem',
            '& fieldset': { borderColor: 'rgba(26,24,21,0.16)' },
            '&:hover fieldset': { borderColor: 'rgba(26,24,21,0.24)' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          }}
        />

        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {filterOptions.map(({ id, label }) => {
            const active = filter === id
            return (
              <Box
                key={id}
                component="button"
                onClick={() => onFilterChange(id)}
                sx={{
                  height: 28,
                  px: '10px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: active ? 'transparent' : 'rgba(26,24,21,0.08)',
                  bgcolor: active ? 'primary.main' : '#ece5d6',
                  color: active ? 'primary.contrastText' : 'text.secondary',
                  fontFamily: '"Inter", system-ui, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'all 120ms cubic-bezier(0.22,1,0.36,1)',
                  whiteSpace: 'nowrap',
                }}
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
