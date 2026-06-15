import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { CardAccountProps } from '../CardAccount.tsx'
import { useEstimatedBalance } from '../hooks/useEstimatedBalance.ts'
import { useTranslate } from '../../../hooks/useTranslate.ts'

export function CardAccountMobile({ id, name, balance }: CardAccountProps) {
  const { estimatedBalance, isLoading } = useEstimatedBalance(id)
  const { formatMoney } = useTranslate()

  return (
    <Card sx={{ flex: '0 0 180px', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="labelSm"
          component="div"
          color="text.secondary"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 2 }}
        >
          {name}
        </Typography>

        <Typography variant="amountMd" component="div">
          {formatMoney(balance, 'BRL')}
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width={80}
            sx={(t) => ({ ...t.typography.caption, mt: 1, bgcolor: 'background.surfaceInset' })}
          />
        ) : (
          <Typography variant="caption" component="div" sx={{ mt: 1 }}>
            {formatMoney(estimatedBalance, 'BRL')}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
