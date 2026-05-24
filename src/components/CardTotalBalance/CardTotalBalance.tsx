import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

interface CardTotalBalanceProps {
  balance: number
}

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function CardTotalBalance({ balance }: CardTotalBalanceProps) {
  return (
    <Card>
      <CardContent sx={{ p: { xs: '20px !important', sm: '28px !important' } }}>
        <Typography variant="caption" component="div" sx={{ mb: 0.5 }}>
          saldo total
        </Typography>

        <Typography
          component="div"
          sx={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontWeight: 500,
            fontSize: { xs: '2.625rem', sm: '3.5rem' },
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'text.primary',
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {fmtMoney(balance)}
        </Typography>
      </CardContent>
    </Card>
  )
}
