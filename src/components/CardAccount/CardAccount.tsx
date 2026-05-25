import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslate } from '../../hooks/useTranslate.ts'
import { useEstimatedBalance } from './hooks/useEstimatedBalance.ts'

export interface CardAccountProps {
  id: string
  name: string
  balance: number
}

function CardAccountMobile({ id, name, balance }: CardAccountProps) {
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

function CardAccountDesktop({ name, balance }: CardAccountProps) {
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

          <Box
            sx={(t) => ({
              width: 40,
              height: 40,
              borderRadius: t.shape.rounded.navItem,
              bgcolor: 'success.light',
              color: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            })}
          />
        </Box>

        <Divider sx={{ my: 4 }} />
      </CardContent>
    </Card>
  )
}

export function CardAccount(props: CardAccountProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile ? <CardAccountMobile {...props} /> : <CardAccountDesktop {...props} />
}
