import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslate } from '../../hooks/useTranslate.ts'

export interface CardAccountProps {
  name: string
  balance: number
  estimatedBalance: number
}

export function CardAccount({ name, balance, estimatedBalance }: CardAccountProps) {
  const { formatMoney } = useTranslate()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 2 }}>
      <Box
        sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 3 }}
      >
        <Typography
          variant="labelSm"
          color="text.primary"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {name}
        </Typography>
        <Typography variant="amountSm" component="div" sx={{ flexShrink: 0 }}>
          {formatMoney(balance, 'BRL')}
        </Typography>
      </Box>

      <Box
        sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 3 }}
      >
        <Typography variant="caption" color="text.disabled">
          Estimado
        </Typography>
        <Typography
          variant="caption"
          component="div"
          color="text.disabled"
          sx={{ flexShrink: 0, fontFeatureSettings: '"tnum" 1', fontWeight: 600 }}
        >
          {formatMoney(estimatedBalance, 'BRL')}
        </Typography>
      </Box>
    </Box>
  )
}
