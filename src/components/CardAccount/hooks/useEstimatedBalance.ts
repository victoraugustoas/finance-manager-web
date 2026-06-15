import { useMonthlyDate } from '../../../hooks/useMonthlyDate.ts'
import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'

export function useEstimatedBalance(accountId: string) {
  const { startDate, endDate } = useMonthlyDate()

  const { data, isLoading } = useAccountRepository('getEstimatedBalance', {
    id: accountId,
    params: {
      startDate,
      endDate,
    },
  })

  return { isLoading, estimatedBalance: data?.estimatedBalance ?? 0 }
}
