import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { useTranslate } from '../../hooks/useTranslate.ts'

interface CardIncomeOutgoProps {
  income: number
  outgo: number
}

export function CardIncomeOutgo({ income, outgo }: CardIncomeOutgoProps) {
  const { formatMoney } = useTranslate()

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          gap: 0,
          p: { xs: 4, sm: 5 },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" component="div" sx={{ mb: 1 }}>
            entradas
          </Typography>
          <Typography variant="displayCard" component="div" color="success.main">
            {formatMoney(income, 'BRL')}
          </Typography>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'block', md: 'none' }, mx: 4 }}
        />
        <Divider sx={{ display: { xs: 'none', md: 'block' }, my: 4 }} />

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" component="div" sx={{ mb: 1 }}>
            saídas
          </Typography>
          <Typography variant="displayCard" component="div" color="text.primary">
            {formatMoney(outgo, 'BRL')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
