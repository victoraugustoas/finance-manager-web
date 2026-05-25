import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTotalBalance } from './hooks/useTotalBalance.ts'
import { useTranslate } from '../../../../hooks/useTranslate.ts'

export function CardTotalBalance() {
  const { balance, isLoading } = useTotalBalance()
  const { formatMoney } = useTranslate()

  return (
    <Card>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="caption" component="div" sx={{ mb: 1 }}>
          saldo total
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width="70%"
            sx={(theme) => ({
              ...theme.typography.displayMoney,
              bgcolor: 'background.surfaceInset',
            })}
          />
        ) : (
          <Typography variant="displayMoney" component="div" color="text.primary">
            {formatMoney(balance, 'BRL')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
