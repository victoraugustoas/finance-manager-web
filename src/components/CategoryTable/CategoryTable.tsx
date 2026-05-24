import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'

export interface CategoryTableRow {
  id: string
  name: string
  icon: LucideIcon
  iconColor: string
  total: number
  count: number
  pct: number
}

interface CategoryTableProps {
  title?: string
  rows: CategoryTableRow[]
}

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CategoryTable({ title = 'detalhamento por categoria', rows }: CategoryTableProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: '16px !important', sm: '24px !important' } }}>
        <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {title}
        </Typography>

        {/* Header — oculto no mobile (compacto) */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'grid' },
            gridTemplateColumns: '1fr 80px 120px 80px',
            pb: 1,
          }}
        >
          {['Categoria', 'Transações', 'Total', '% do mês'].map((h, i) => (
            <Typography
              key={h}
              sx={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'text.disabled',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textAlign: i >= 2 ? 'right' : 'left',
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        <Divider sx={{ display: { xs: 'none', sm: 'block' } }} />

        {rows.map((row, idx) => {
          const Icon = row.icon
          const isLast = idx === rows.length - 1
          return (
            <Box key={row.id}>
              {/* Desktop: 4 colunas */}
              <Box
                sx={{
                  display: { xs: 'none', sm: 'grid' },
                  gridTemplateColumns: '1fr 80px 120px 80px',
                  alignItems: 'center',
                  py: '14px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      bgcolor: row.iconColor,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    {row.name}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {row.count}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, textAlign: 'right', fontFeatureSettings: '"tnum" 1' }}>
                  {fmtMoney(row.total)}
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', textAlign: 'right', fontFeatureSettings: '"tnum" 1' }}>
                  {row.pct.toFixed(0)}%
                </Typography>
              </Box>

              {/* Mobile: linha compacta com ícone + nome + valor */}
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  alignItems: 'center',
                  gap: 1.5,
                  py: '12px',
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    bgcolor: row.iconColor,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} strokeWidth={2} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{row.name}</Typography>
                  <Typography variant="caption">{row.count} transações · {row.pct.toFixed(0)}%</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, fontFeatureSettings: '"tnum" 1', flexShrink: 0 }}>
                  {fmtMoney(row.total)}
                </Typography>
              </Box>

              {!isLast && <Divider />}
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}
