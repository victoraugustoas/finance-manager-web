import { endOfMonth } from 'date-fns'
import { useAccountRepository } from '../../../network/hooks/useAccountRepository.ts'

export function useEstimatedBalance(accountId: string) {
  const { data, isLoading } = useAccountRepository('getEstimatedBalance', {
    id: accountId,
    params: {
      startDate: new Date().toISOString(),
      endDate: endOfMonth(new Date()).toISOString(),
    },
  })

  return { isLoading, estimatedBalance: data?.estimatedBalance ?? 0 }
}
