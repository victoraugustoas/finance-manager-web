import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { TransactionRepository } from '../TransactionRepository.ts'
import type {
  ListExpenseItemResponseDto,
  ListIncomeItemResponseDto,
  ListTransferItemResponseDto,
  TransactionParams,
} from '../dtos/index.ts'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'

type TransactionRepositoryOpts = {
  getExpenses: [params?: TransactionParams]
  getIncomes: [params?: TransactionParams]
  getTransfers: [params?: TransactionParams]
}

function buildQueryRepositoryTransaction(method: keyof TransactionRepository, opts: unknown[]) {
  switch (method) {
    case 'getExpenses': {
      const params = opts[0] as TransactionParams | undefined
      return {
        queryKey: ['transactions', 'expenses', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/transactions/expenses`)
          if (params?.startDate) url.searchParams.set('startDate', params.startDate)
          if (params?.endDate) url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          const data = (await response.json()) as { expenses: ListExpenseItemResponseDto[] }
          return data.expenses
        },
      }
    }
    case 'getIncomes': {
      const params = opts[0] as TransactionParams | undefined
      return {
        queryKey: ['transactions', 'incomes', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/transactions/incomes`)
          if (params?.startDate) url.searchParams.set('startDate', params.startDate)
          if (params?.endDate) url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          const data = (await response.json()) as { incomes: ListIncomeItemResponseDto[] }
          return data.incomes
        },
      }
    }
    case 'getTransfers': {
      const params = opts[0] as TransactionParams | undefined
      return {
        queryKey: ['transactions', 'transfers', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/transactions/transfers`)
          if (params?.startDate) url.searchParams.set('startDate', params.startDate)
          if (params?.endDate) url.searchParams.set('endDate', params.endDate)
          const response = await fetch(url)
          const data = (await response.json()) as { transfers: ListTransferItemResponseDto[] }
          return data.transfers
        },
      }
    }
    default:
      return undefined
  }
}

export function useTransactionRepository<K extends keyof TransactionRepository>(
  method: K,
  ...opts: TransactionRepositoryOpts[K]
): RepositoryWithCache<TransactionRepository>[K] {
  const { data, isLoading, refetch } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildQueryRepositoryTransaction(method, opts as unknown[]) as any,
  )
  return { data, isLoading, retry: refetch } as RepositoryWithCache<TransactionRepository>[K]
}
