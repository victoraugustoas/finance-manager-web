import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { AccountRepository } from '../AccountRepository.ts'
import type {
  EstimatedBalanceParams,
  EstimatedBalanceResponseDto,
  ListAccountsItemResponseDto,
} from '../dtos/index.ts'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'
import type { GetAccountsParams } from '../dtos/GetAccountsParams.ts'

type AccountRepositoryOpts = {
  getAccounts: [{ params: GetAccountsParams }]
  getEstimatedBalance: [{ id: string; params?: EstimatedBalanceParams }]
}

function buildQueryRepositoryAccount(method: keyof AccountRepository, opts: unknown[]) {
  switch (method) {
    case 'getAccounts': {
      const { params } = opts[0] as { params?: GetAccountsParams }
      return {
        queryKey: ['accounts', params?.endDate],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/reporting/accounts`)
          if (params?.endDate) url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          const data = (await response.json()) as { accounts: ListAccountsItemResponseDto[] }
          return data.accounts
        },
      }
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
    default:
      return undefined
  }
}

export function useAccountRepository<K extends keyof AccountRepository>(
  method: K,
  ...opts: AccountRepositoryOpts[K]
): RepositoryWithCache<AccountRepository>[K] {
  const { data, isLoading, refetch } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildQueryRepositoryAccount(method, opts as unknown[]) as any,
  )
  return { data, isLoading, retry: refetch } as RepositoryWithCache<AccountRepository>[K]
}
