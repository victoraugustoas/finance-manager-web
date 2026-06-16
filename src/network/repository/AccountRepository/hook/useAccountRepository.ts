import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { AccountRepository } from '../AccountRepository.ts'
import type { ListAccountsItemResponseDto, ListAccountsParams } from '../dtos/index.ts'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'

type AccountRepositoryOpts = {
  getAccounts: [{ params: ListAccountsParams }]
}

function buildQueryRepositoryAccount(method: keyof AccountRepository, opts: unknown[]) {
  switch (method) {
    case 'getAccounts': {
      const { params } = opts[0] as { params: ListAccountsParams }
      return {
        queryKey: ['reporting', 'accounts', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/reporting/accounts`)
          url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          const data = (await response.json()) as { accounts: ListAccountsItemResponseDto[] }
          return data.accounts
        },
        enabled: !!params.endDate,
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
