import { endOfMonth } from 'date-fns'
import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'

export function useTotalBalance() {
  const { data = [], isLoading } = useAccountRepository('getAccounts', {
    params: {
      endDate: endOfMonth(new Date()).toISOString(),
    },
  })
  const balance = data.reduce((acc, account) => acc + account.balance, 0)
  return { isLoading, balance }
}
