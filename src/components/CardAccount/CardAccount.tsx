import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { CreditCard, PiggyBank, Wallet } from 'lucide-react'

type AccountType = 'checking' | 'savings' | 'credit'

interface CardAccountProps {
  name: string
  tail: string
  type: AccountType
  balance: number
  limit?: number
}

function fmtMoney(n: number) {
  return `R$ ${Math.abs(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const typeLabel: Record<AccountType, string> = {
  checking: 'corrente',
  savings: 'poupança',
  credit: 'cartão',
}

const iconSize: Record<'mobile' | 'desktop', number> = {
  mobile: 14,
  desktop: 20,
}

const TypeIcon = ({ type, size }: { type: AccountType; size: number }) => {
  const props = { size, strokeWidth: 2 }
  if (type === 'credit') return <CreditCard {...props} />
  if (type === 'savings') return <PiggyBank {...props} />
  return <Wallet {...props} />
}

// Mobile: card compacto (180px) para scroll horizontal
function CardAccountMobile({ name, tail, type, balance }: CardAccountProps) {
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
          <Box sx={{ color: 'text.secondary', display: 'flex' }}>
            <TypeIcon type={type} size={iconSize.mobile} />
          </Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </Typography>
        </Box>

        <Typography
          component="div"
          sx={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.2,
            color: 'text.primary',
            fontFeatureSettings: '"tnum" 1',
          }}
        >
          {fmtMoney(balance)}
        </Typography>

        <Typography
          variant="caption"
          component="div"
          sx={{ mt: 0.25, color: 'text.disabled', fontSize: '0.6875rem' }}
        >
          final {tail}
        </Typography>
      </CardContent>
    </Card>
  )
}

// Desktop: card completo com ícone no canto e barra de limite
function CardAccountDesktop({ name, tail, type, balance, limit }: CardAccountProps) {
  const usedPct = limit ? Math.round((balance / limit) * 100) : null

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" component="div">
              {name} · final {tail}
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
                fontFeatureSettings: '"tnum" 1',
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
          >
            <TypeIcon type={type} size={iconSize.desktop} />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {usedPct !== null ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">{typeLabel[type]} usado</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontFeatureSettings: '"tnum" 1' }}>
                {usedPct}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={usedPct} color="primary" />
          </>
        ) : (
          <Typography variant="caption">{typeLabel[type]}</Typography>
        )}
      </CardContent>
    </Card>
  )
}

export function CardAccount(props: CardAccountProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile
    ? <CardAccountMobile {...props} />
    : <CardAccountDesktop {...props} />
}
