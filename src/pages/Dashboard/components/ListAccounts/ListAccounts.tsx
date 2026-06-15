import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { CardAccount } from '../../../../components/CardAccount/CardAccount.tsx'
import { useListAccounts } from '../../hooks/useListAccounts.ts'

export function ListAccounts() {
  const { isLoading, accounts } = useListAccounts()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        overflowX: { xs: 'auto', sm: 'auto' },
        flexWrap: { xs: 'nowrap' },
        pb: { xs: 1, sm: 0 },
      }}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              animation="wave"
              sx={(t) => ({
                width: { xs: 180, sm: 280 },
                height: { xs: 96, sm: 110 },
                flexShrink: 0,
                borderRadius: t.shape.rounded.lg,
                bgcolor: 'background.surfaceInset',
              })}
            />
          ))
        : accounts.map((a) => (
            <CardAccount key={a.id} id={a.id} name={a.name} balance={a.balance} />
          ))}
    </Box>
  )
}
