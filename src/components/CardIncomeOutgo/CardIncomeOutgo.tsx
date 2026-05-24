import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

interface CardIncomeOutgoProps {
  income: number
  outgo: number
}

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CardIncomeOutgo({ income, outgo }: CardIncomeOutgoProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          // Mobile: lado a lado / Desktop: empilhado (coluna)
          flexDirection: { xs: 'row', md: 'column' },
          gap: 0,
          p: { xs: '16px !important', sm: '24px !important' },
        }}
      >
        {/* Entradas */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
            entradas
          </Typography>
          <Typography
            component="div"
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 500,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              fontFeatureSettings: '"tnum" 1',
              color: 'success.main',
            }}
          >
            {fmtMoney(income)}
          </Typography>
        </Box>

        {/* Divider: vertical no mobile, horizontal no desktop */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'block', md: 'none' }, mx: 2 }}
        />
        <Divider sx={{ display: { xs: 'none', md: 'block' }, my: 2 }} />

        {/* Saídas */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
            saídas
          </Typography>
          <Typography
            component="div"
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 500,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              fontFeatureSettings: '"tnum" 1',
              color: 'text.primary',
            }}
          >
            {fmtMoney(outgo)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
