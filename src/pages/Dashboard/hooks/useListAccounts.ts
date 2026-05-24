import { useAccountRepository } from '../../../network/hooks/useAccountRepository.ts'

export function useListAccounts() {
  const { data: accounts = [], isLoading } = useAccountRepository('getAccounts')
  return { isLoading, accounts }
}
