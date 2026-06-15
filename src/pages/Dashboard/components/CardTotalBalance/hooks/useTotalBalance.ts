import { useAccountRepository } from '../../../../../network/repository/AccountRepository/hook/useAccountRepository.ts'
import { useMonthlyDate } from '../../../../../hooks/useMonthlyDate.ts'

export function useTotalBalance() {
  const { endDate } = useMonthlyDate()
  const { data = [], isLoading } = useAccountRepository('getAccounts', {
    params: { endDate },
  })
  const balance = data.reduce((acc, account) => acc + account.balance, 0)
  return { isLoading, balance }
}
