import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../endpoints/endpoints.ts'
import type {
  AccountRepository,
  EstimatedBalanceParams,
  EstimatedBalanceResponseDto,
  ListAccountsItemResponseDto,
} from '../repository/AccountRepository.ts'
import type { RepositoryWithCache } from '../repository/RepositoryWithCache.ts'

type AccountRepositoryOpts = {
  getAccounts: []
  getEstimatedBalance: [{ id: string; params?: EstimatedBalanceParams }]
}

function buildQueryRepositoryAccount(method: keyof AccountRepository, opts: unknown[]) {
  switch (method) {
    case 'getAccounts':
      return {
        queryKey: ['accounts'],
        queryFn: async () => {
          const response = await fetch(`${Endpoints.BASE_URL}/accounts`)
          const data = (await response.json()) as { accounts: ListAccountsItemResponseDto[] }
          return data.accounts
        },
      }
    case 'getEstimatedBalance': {
      const { id, params } = opts[0] as { id: string; params?: EstimatedBalanceParams }
      return {
        queryKey: ['accounts', id, 'estimated-balance', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/accounts/${id}/estimated-balance`)
          if (params?.startDate) url.searchParams.set('startDate', params.startDate)
          if (params?.endDate) url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          return (await response.json()) as EstimatedBalanceResponseDto
        },
        enabled: !!id,
      }
    }
  }
}

export function useAccountRepository<K extends keyof AccountRepository>(
  method: K,
  ...opts: AccountRepositoryOpts[K]
): RepositoryWithCache<AccountRepository>[K] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, refetch } = useQuery(
    buildQueryRepositoryAccount(method, opts as unknown[]) as any,
  )
  return { data, isLoading, retry: refetch } as RepositoryWithCache<AccountRepository>[K]
}
