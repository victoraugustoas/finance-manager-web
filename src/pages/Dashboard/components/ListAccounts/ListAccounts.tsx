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
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              animation="wave"
              sx={(t) => ({
                width: '100%',
                height: { xs: 88, sm: 74 },
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
