import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

export interface CategoryBreakdownItem {
  id: string
  name: string
  color: string
  total: number
}

interface CategoryBreakdownProps {
  items: CategoryBreakdownItem[]
  onSeeAll?: () => void
}

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CategoryBreakdown({ items, onSeeAll }: CategoryBreakdownProps) {
  const total = items.reduce((s, i) => s + i.total, 0)

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
            por categoria
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          {items.map(({ id, name, color, total: itemTotal }) => {
            const pct = total > 0 ? (itemTotal / total) * 100 : 0
            return (
              <Box key={id}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: '6px',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: color,
                        flexShrink: 0,
                      }}
                    />
                    <Typography sx={{ fontSize: '0.8125rem', color: 'text.primary' }}>
                      {name}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      fontFeatureSettings: '"tnum" 1',
                    }}
                  >
                    {fmtMoney(itemTotal)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{
                    '& .MuiLinearProgress-bar': { bgcolor: color },
                  }}
                />
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}
