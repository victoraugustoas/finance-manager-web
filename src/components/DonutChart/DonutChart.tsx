import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { useTranslate } from '../../hooks/useTranslate.ts'

export interface DonutSegment {
  id: string
  label: string
  color: string
  value: number
}

interface DonutChartProps {
  title: string
  segments: DonutSegment[]
  centerLabel?: string
}

export function DonutChart({ title, segments, centerLabel = 'total' }: DonutChartProps) {
  const theme = useTheme()
  const { formatMoney } = useTranslate()
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  const paperColor = theme.palette.background.paper

  let cumulative = 0
  const paths = segments.map((seg) => {
    const pct = total > 0 ? seg.value / total : 0
    const start = cumulative
    cumulative += pct
    const r = 40
    const a1 = start * 2 * Math.PI
    const a2 = cumulative * 2 * Math.PI
    const x1 = r * Math.cos(a1)
    const y1 = r * Math.sin(a1)
    const x2 = r * Math.cos(a2)
    const y2 = r * Math.sin(a2)
    const large = pct > 0.5 ? 1 : 0
    return {
      ...seg,
      d: `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
    }
  })

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          p: { xs: 4, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h2" sx={{ alignSelf: 'flex-start' }}>
          {title}
        </Typography>

        <Box
          sx={{ position: 'relative', width: { xs: 160, sm: 200 }, height: { xs: 160, sm: 200 } }}
        >
          <svg
            viewBox="-50 -50 100 100"
            width="100%"
            height="100%"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {paths.map(({ id, color, d }) => (
              <path key={id} d={d} fill={color} stroke={paperColor} strokeWidth="1.2" />
            ))}
            <circle cx="0" cy="0" r="22" fill={paperColor} />
          </svg>

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption">{centerLabel}</Typography>
            <Typography variant="displayXs" component="div" color="text.primary">
              {formatMoney(total, 'BRL')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {segments.slice(0, 5).map((seg) => {
            const pct = total > 0 ? (seg.value / total) * 100 : 0
            return (
              <Box key={seg.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={(t) => ({
                    width: 8,
                    height: 8,
                    borderRadius: t.shape.rounded.circle,
                    bgcolor: seg.color,
                    flexShrink: 0,
                  })}
                />
                <Typography variant="labelSm" color="text.secondary" sx={{ flex: 1 }}>
                  {seg.label}
                </Typography>
                <Typography variant="amountSm" color="text.primary">
                  {pct.toFixed(0)}%
                </Typography>
              </Box>
            )
          })}
        </Box>
      </CardContent>
    </Card>
  )
}
