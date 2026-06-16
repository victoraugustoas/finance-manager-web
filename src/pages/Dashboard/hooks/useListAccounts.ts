import { endOfMonth } from 'date-fns'
import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'

export function useListAccounts() {
  const { data: accounts = [], isLoading } = useAccountRepository('getAccounts', {
    params: {
      endDate: endOfMonth(new Date()).toISOString(),
    },
  })
  return { isLoading, accounts }
}
