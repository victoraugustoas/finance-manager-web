import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { CardAccount } from '../../../../components/CardAccount/CardAccount.tsx'
import { useListAccounts } from '../../hooks/useListAccounts.ts'

export function ListAccounts() {
  const { isLoading, accounts } = useListAccounts()

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Contas
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Box key={i}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 3,
                    }}
                  >
                    <Skeleton width="38%" sx={{ bgcolor: 'background.surfaceInset' }} />
                    <Skeleton width={84} sx={{ bgcolor: 'background.surfaceInset' }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 3,
                    }}
                  >
                    <Skeleton width={64} sx={{ bgcolor: 'background.surfaceInset' }} />
                    <Skeleton width={76} sx={{ bgcolor: 'background.surfaceInset' }} />
                  </Box>
                </Box>
                {i < 2 && <Divider />}
              </Box>
            ))}
          </Box>
        ) : accounts.length === 0 ? (
          <Typography variant="body2" color="text.disabled" sx={{ py: 3, textAlign: 'center' }}>
            nenhuma conta cadastrada
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {accounts.map((a, index) => (
              <Box key={a.id}>
                <CardAccount
                  name={a.name}
                  balance={a.balance}
                  estimatedBalance={a.estimatedBalance}
                />
                {index < accounts.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
