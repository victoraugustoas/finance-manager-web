import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export interface BarChartSeries {
  label: string
  color: string
  values: number[]
}

interface BarChartProps {
  title: string
  months: string[]
  series: BarChartSeries[]
}

export function BarChart({ title, months, series }: BarChartProps) {
  const allValues = series.flatMap(s => s.values)
  const max = Math.max(...allValues) || 1

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: '16px !important', sm: '28px !important' } }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: { xs: 2, sm: 2.5 },
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {series.map(s => (
              <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.75rem', color: 'text.secondary' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '2px', bgcolor: s.color, flexShrink: 0 }} />
                {s.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Barras */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${months.length}, 1fr)`,
            gap: { xs: 0.75, sm: '14px' },
            height: { xs: 140, sm: 220 },
            alignItems: 'flex-end',
          }}
        >
          {months.map((month, i) => (
            <Box
              key={month}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: { xs: '2px', sm: '4px' },
                  alignItems: 'flex-end',
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {series.map(s => (
                  <Box
                    key={s.label}
                    sx={{
                      width: `${Math.floor(38 / series.length)}%`,
                      height: `${(s.values[i] / max) * 100}%`,
                      minHeight: 2,
                      bgcolor: s.color,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 400ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '0.625rem', sm: '0.6875rem' },
                  color: 'text.disabled',
                  mt: 1,
                }}
              >
                {month}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
