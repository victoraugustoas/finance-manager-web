import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

interface CardTotalBalanceProps {
  balance: number
  trend?: string
  netLabel?: string
  sparklineData?: number[]
}

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function Sparkline({
  data,
  width,
  height,
}: {
  data: number[]
  width: number
  height: number
}) {
  if (data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = width / (data.length - 1)
  const points = data
    .map((v, i) => `${i * step},${height - ((v - min) / range) * height}`)
    .join(' ')
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', flexShrink: 0, display: 'block' }}
    >
      <polyline
        points={points}
        fill="none"
        stroke="#3d6b4f"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CardTotalBalance({
  balance,
  trend,
  netLabel,
  sparklineData = [],
}: CardTotalBalanceProps) {
  const hasSparkline = sparklineData.length >= 2

  return (
    <Card>
      <CardContent
        sx={{ p: { xs: '20px !important', sm: '28px !important' } }}
      >
        {/* Linha principal: saldo (esquerda) + sparkline no desktop (direita) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
              saldo total
            </Typography>

            <Typography
              component="div"
              sx={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 500,
                // Mobile: 42px / Desktop: 56px — espelhando o design system
                fontSize: { xs: '2.625rem', sm: '3.5rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'text.primary',
                fontFeatureSettings: '"tnum" 1',
              }}
            >
              {fmtMoney(balance)}
            </Typography>

            {/* Mobile: chip + sparkline na mesma linha inferior */}
            {/* Desktop: só chip + netLabel (sparkline fica à direita) */}
            {(trend || netLabel) && (
              <Box
                sx={{
                  mt: 1.75,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
                  {trend && (
                    <Chip
                      label={trend}
                      size="small"
                      sx={{
                        bgcolor: 'success.light',
                        color: 'success.main',
                        border: 'none',
                        fontWeight: 600,
                      }}
                    />
                  )}
                  {netLabel && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.disabled',
                        // Oculta netLabel no mobile para não poluir — fica só o chip
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      {netLabel}
                    </Typography>
                  )}
                </Box>

                {/* Sparkline mobile: aparece à direita do chip */}
                {hasSparkline && (
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Sparkline data={sparklineData} width={100} height={32} />
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Sparkline desktop: à direita do saldo, verticalmente centrado */}
          {hasSparkline && (
            <Box
              sx={{
                pt: 0.5,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Sparkline data={sparklineData} width={180} height={56} />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
