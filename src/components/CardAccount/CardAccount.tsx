import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEstimatedBalance } from './hooks/useEstimatedBalance.ts'

export interface CardAccountProps {
  id: string
  name: string
  balance: number
}

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function CardAccountMobile({ id, name, balance }: CardAccountProps) {
  const { estimatedBalance, isLoading } = useEstimatedBalance(id)

  return (
    <Card
      sx={{
        flex: '0 0 180px',
        borderRadius: '16px !important',
        cursor: 'pointer',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <CardContent sx={{ p: '16px !important' }}>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'text.secondary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1.25,
          }}
        >
          {name}
        </Typography>

        <Typography
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.2,
            color: 'text.primary',
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {fmtMoney(balance)}
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width={80}
            sx={{ fontSize: '0.6875rem', mt: 0.25, bgcolor: '#ece5d6' }}
          />
        ) : (
          <Typography
            variant="caption"
            component="div"
            sx={{ mt: 0.25, color: 'text.disabled', fontSize: '0.6875rem' }}
          >
            {fmtMoney(estimatedBalance)}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

function CardAccountDesktop({ name, balance }: CardAccountProps) {
  return (
    <Card sx={{ maxWidth: 360, minWidth: 280 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" component="div">
              {name}
            </Typography>
            <Typography
              component="div"
              sx={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 500,
                fontSize: '2rem',
                lineHeight: 1.1,
                letterSpacing: '-0.018em',
                mt: 0.5,
                fontFeatureSettings: '"tnum" 1, "cv11" 1',
                color: 'text.primary',
              }}
            >
              {fmtMoney(balance)}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: 'success.light',
              color: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />
      </CardContent>
    </Card>
  )
}

export function CardAccount(props: CardAccountProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile ? <CardAccountMobile {...props} /> : <CardAccountDesktop {...props} />
}
