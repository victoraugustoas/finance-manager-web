import { useAccountRepository } from '../../../network/repository/AccountRepository/hook/useAccountRepository.ts'

export function useListAccounts() {
  const { data: accounts = [], isLoading } = useAccountRepository('getAccounts')
  return { isLoading, accounts }
}
