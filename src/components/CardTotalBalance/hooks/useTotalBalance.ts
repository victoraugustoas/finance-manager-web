import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'

export function useTotalBalance() {
  const { data = [], isLoading } = useAccountRepository('getAccounts')
  const balance = data.reduce((acc, account) => acc + account.actualBalance, 0)
  return { isLoading, balance }
}
