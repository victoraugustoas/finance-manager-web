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
  const allValues = series.flatMap((s) => s.values)
  const max = Math.max(...allValues) || 1

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: { xs: 4, sm: 5 },
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="h2">{title}</Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {series.map((s) => (
              <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '2px',
                    bgcolor: s.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${months.length}, 1fr)`,
            gap: { xs: 1, sm: 4 },
            height: { xs: 140, sm: 220 },
            alignItems: 'flex-end',
          }}
        >
          {months.map((month, i) => (
            <Box
              key={month}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'flex-end',
                  flex: 1,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {series.map((s) => (
                  <Box
                    key={s.label}
                    sx={(t) => ({
                      width: `${Math.floor(38 / series.length)}%`,
                      height: `${(s.values[i] / max) * 100}%`,
                      minHeight: 2,
                      bgcolor: s.color,
                      borderRadius: `${t.shape.rounded.icon / 2}px ${t.shape.rounded.icon / 2}px 0 0`,
                      transition: 'height 400ms cubic-bezier(0.22,1,0.36,1)',
                    })}
                  />
                ))}
              </Box>
              <Typography variant="navLabel" color="text.disabled" sx={{ mt: 2 }}>
                {month}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
