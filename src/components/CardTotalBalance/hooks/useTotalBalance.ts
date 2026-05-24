import { useAccountRepository } from '../../../network/hooks/useAccountRepository.ts'

export function useTotalBalance() {
  const { data = [], isLoading } = useAccountRepository('getAccounts')
  const balance = data.reduce((acc, account) => acc + account.actualBalance, 0)
  return { isLoading, balance }
}
