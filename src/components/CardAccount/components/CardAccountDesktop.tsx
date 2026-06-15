import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { CardAccountProps } from '../CardAccount.tsx'
import { useTranslate } from '../../../hooks/useTranslate.ts'

export function CardAccountDesktop({ name, balance }: CardAccountProps) {
  const { formatMoney } = useTranslate()

  return (
    <Card sx={{ maxWidth: 360, minWidth: 280 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" component="div">
              {name}
            </Typography>
            <Typography variant="displaySm" component="div" color="text.primary" sx={{ mt: 1 }}>
              {formatMoney(balance, 'BRL')}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="amountSm" component="div" color="text.primary" sx={{ mt: 1 }}>
          {formatMoney(balance, 'BRL')}
        </Typography>
      </CardContent>
    </Card>
  )
}
