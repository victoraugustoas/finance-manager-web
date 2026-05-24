import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { CardAccount } from '../../../components/CardAccount/CardAccount.tsx'
import { useListAccounts } from '../hooks/useListAccounts.ts'

export function ListAccounts() {
  const { isLoading, accounts } = useListAccounts()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: { xs: 'auto', sm: 'auto' },
        flexWrap: { xs: 'nowrap' },
        pb: { xs: 0.5, sm: 0 },
      }}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              animation="wave"
              sx={{
                width: { xs: 180, sm: 280 },
                height: { xs: 96, sm: 110 },
                flexShrink: 0,
                borderRadius: { xs: '16px', sm: '12px' },
                bgcolor: '#ece5d6',
              }}
            />
          ))
        : accounts.map((a) => (
            <CardAccount key={a.id} id={a.id} name={a.name} balance={a.actualBalance} />
          ))}
    </Box>
  )
}
