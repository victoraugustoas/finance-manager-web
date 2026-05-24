import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTotalBalance } from './hooks/useTotalBalance.ts'

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CardTotalBalance() {
  const { balance, isLoading } = useTotalBalance()

  return (
    <Card>
      <CardContent sx={{ p: { xs: '20px !important', sm: '28px !important' } }}>
        <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
          saldo total
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width="70%"
            sx={{ fontSize: { xs: '2.625rem', sm: '3.5rem' }, bgcolor: '#ece5d6' }}
          />
        ) : (
          <Typography
            component="div"
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 500,
              fontSize: { xs: '2.625rem', sm: '3.5rem' },
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'text.primary',
              fontFeatureSettings: '"tnum" 1, "cv11" 1',
            }}
          >
            {fmtMoney(balance)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
