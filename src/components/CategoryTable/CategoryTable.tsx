import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { LucideIcon } from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate.ts'

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

export function CategoryTable({ title = 'detalhamento por categoria', rows }: CategoryTableProps) {
  const { formatMoney } = useTranslate()

  return (
    <Card>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          {title}
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', sm: 'grid' },
            gridTemplateColumns: '1fr 80px 120px 80px',
            pb: 2,
          }}
        >
          {['Categoria', 'Transações', 'Total', '% do mês'].map((h, i) => (
            <Typography
              key={h}
              variant="tableHeader"
              component="div"
              color="text.disabled"
              sx={{ textAlign: i >= 2 ? 'right' : 'left' }}
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
                  py: 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box
                    sx={(t) => ({
                      width: 32,
                      height: 32,
                      borderRadius: t.shape.rounded.icon,
                      bgcolor: row.iconColor,
                      color: 'common.white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    })}
                  >
                    <Icon size={16} strokeWidth={2} />
                  </Box>
                  <Typography variant="rowTitle" component="div">
                    {row.name}
                  </Typography>
                </Box>
                <Typography variant="labelSm" color="text.secondary">
                  {row.count}
                </Typography>
                <Typography variant="rowAmount" component="div" sx={{ textAlign: 'right' }}>
                  {formatMoney(row.total, 'BRL')}
                </Typography>
                <Typography
                  variant="amountSm"
                  component="div"
                  color="text.secondary"
                  sx={{ textAlign: 'right' }}
                >
                  {row.pct.toFixed(0)}%
                </Typography>
              </Box>

              {/* Mobile: linha compacta */}
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  alignItems: 'center',
                  gap: 3,
                  py: 3,
                }}
              >
                <Box
                  sx={(t) => ({
                    width: 32,
                    height: 32,
                    borderRadius: t.shape.rounded.icon,
                    bgcolor: row.iconColor,
                    color: 'common.white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  })}
                >
                  <Icon size={16} strokeWidth={2} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="rowTitle" component="div">
                    {row.name}
                  </Typography>
                  <Typography variant="caption">
                    {row.count} transações · {row.pct.toFixed(0)}%
                  </Typography>
                </Box>
                <Typography variant="rowAmount" component="div" sx={{ flexShrink: 0 }}>
                  {formatMoney(row.total, 'BRL')}
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
