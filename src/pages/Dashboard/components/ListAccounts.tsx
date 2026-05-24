import { CardAccount } from '../../../components/CardAccount/CardAccount.tsx'
import Box from '@mui/material/Box'
import { useListAccounts } from '../hooks/useListAccounts.ts'

export function ListAccounts() {
  const { isLoading, accounts } = useListAccounts()
  if (isLoading) return null
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: { xs: 'auto', sm: 'visible' },
        flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
        pb: { xs: 0.5, sm: 0 },
      }}
    >
      {accounts.map((a) => (
        <CardAccount key={a.id} name={a.name} balance={a.actualBalance} id={a.id} />
      ))}
    </Box>
  )
}
