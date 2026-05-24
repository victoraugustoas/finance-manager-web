import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

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

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function DonutChart({ title, segments, centerLabel = 'total' }: DonutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)

  // Calcula ângulos acumulados para os segmentos do donut
  let cumulative = 0
  const paths = segments.map(seg => {
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
          p: { xs: '16px !important', sm: '28px !important' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, alignSelf: 'flex-start' }}>
          {title}
        </Typography>

        {/* SVG Donut */}
        <Box sx={{ position: 'relative', width: { xs: 160, sm: 200 }, height: { xs: 160, sm: 200 } }}>
          <svg
            viewBox="-50 -50 100 100"
            width="100%"
            height="100%"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {paths.map(({ id, color, d }) => (
              <path
                key={id}
                d={d}
                fill={color}
                stroke="#fffdf8"
                strokeWidth="1.2"
              />
            ))}
            <circle cx="0" cy="0" r="22" fill="#fffdf8" />
          </svg>

          {/* Centro */}
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
            <Typography
              sx={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1.125rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                fontFeatureSettings: '"tnum" 1',
                color: 'text.primary',
              }}
            >
              {fmtMoney(total)}
            </Typography>
          </Box>
        </Box>

        {/* Legenda */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {segments.slice(0, 5).map(seg => {
            const pct = total > 0 ? (seg.value / total) * 100 : 0
            return (
              <Box key={seg.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: seg.color, flexShrink: 0 }} />
                <Typography sx={{ flex: 1, fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {seg.label}
                </Typography>
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, fontFeatureSettings: '"tnum" 1', color: 'text.primary' }}>
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
