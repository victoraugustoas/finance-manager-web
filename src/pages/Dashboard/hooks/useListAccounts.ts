import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'
import { useMonthlyDate } from '../../../hooks/useMonthlyDate.ts'

export function useListAccounts() {
  const { endDate } = useMonthlyDate()
  const { data: accounts = [], isLoading } = useAccountRepository('getAccounts', {
    params: { endDate },
  })
  return { isLoading, accounts }
}
