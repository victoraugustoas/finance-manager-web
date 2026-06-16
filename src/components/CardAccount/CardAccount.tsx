import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useTranslate } from '../../hooks/useTranslate.ts'
import { useEstimatedBalance } from './hooks/useEstimatedBalance.ts'

export interface CardAccountProps {
  id: string
  name: string
  balance: number
}

export function CardAccount({ id, name, balance }: CardAccountProps) {
  const { formatMoney } = useTranslate()
  const { estimatedBalance, isLoading } = useEstimatedBalance(id)

  return (
    <Card sx={{ width: '100%', cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) 120px 140px' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: { xs: 3, sm: 4 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <Box
              sx={(t) => ({
                width: 8,
                height: 8,
                borderRadius: t.shape.rounded.circle,
                bgcolor: 'primary.main',
                flexShrink: 0,
              })}
            />
            <Typography
              variant="labelSm"
              color="text.primary"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: 'grid', sm: 'contents' },
              gridTemplateColumns: { xs: '1fr 1fr' },
              gap: { xs: 3, sm: 0 },
            }}
          >
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
              <Typography variant="caption" component="div" color="text.disabled">
                Atual
              </Typography>
              <Typography variant="amountSm" component="div">
                {formatMoney(balance, 'BRL')}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" component="div" color="text.disabled">
                Fim do mês
              </Typography>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={88}
                  sx={(t) => ({
                    ...t.typography.amountSm,
                    ml: 'auto',
                    bgcolor: 'background.surfaceInset',
                  })}
                />
              ) : (
                <Typography variant="amountSm" component="div">
                  {formatMoney(estimatedBalance, 'BRL')}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
