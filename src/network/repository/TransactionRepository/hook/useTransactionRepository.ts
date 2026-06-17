import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { TransactionRepository } from '../TransactionRepository.ts'
import type {
  ListExpenseItemResponseDto,
  ListIncomeItemResponseDto,
  ListTransferItemResponseDto,
  RegisterExpenseRequestDto,
  RegisterIncomeRequestDto,
  TransactionParams,
} from '../dtos/index.ts'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'

type TransactionRepositoryOpts = {
  getExpenses: [params?: TransactionParams]
  getIncomes: [params?: TransactionParams]
  getTransfers: [params?: TransactionParams]
  registerNewExpense: []
  registerNewIncome: []
}

type QueryConfig = { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled?: boolean }
type MutationConfig = { mutationFn: (variables: unknown) => Promise<unknown> }
type MethodConfig = QueryConfig | MutationConfig

function isMutation(config: MethodConfig): config is MutationConfig {
  return 'mutationFn' in config
}

async function postJson(path: string, variables: unknown): Promise<void> {
  const response = await fetch(`${Endpoints.BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(variables),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Erro ao cadastrar movimentação')
  }
}

function createTransactionsQueryConfig<T>(
  key: string,
  path: string,
  params: TransactionParams | undefined,
  selectData: (data: T) => unknown,
): QueryConfig {
  return {
    queryKey: ['transactions', key, params],
    queryFn: async () => {
      const url = new URL(`${Endpoints.BASE_URL}${path}`)
      if (params?.startDate) url.searchParams.set('startDate', params.startDate)
      if (params?.endDate) url.searchParams.set('endDate', params.endDate)

      const response = await fetch(url)
      const data = (await response.json()) as T
      return selectData(data)
    },
  }
}

function buildConfig(method: keyof TransactionRepositoryOpts, opts: unknown[]): MethodConfig {
  switch (method) {
    case 'getExpenses': {
      const params = opts[0] as TransactionParams | undefined
      return createTransactionsQueryConfig<{ expenses: ListExpenseItemResponseDto[] }>(
        'expenses',
        '/transactions/expenses',
        params,
        (data) => data.expenses,
      )
    }
    case 'getIncomes': {
      const params = opts[0] as TransactionParams | undefined
      return createTransactionsQueryConfig<{ incomes: ListIncomeItemResponseDto[] }>(
        'incomes',
        '/transactions/incomes',
        params,
        (data) => data.incomes,
      )
    }
    case 'getTransfers': {
      const params = opts[0] as TransactionParams | undefined
      return createTransactionsQueryConfig<{ transfers: ListTransferItemResponseDto[] }>(
        'transfers',
        '/transactions/transfers',
        params,
        (data) => data.transfers,
      )
    }
    case 'registerNewExpense':
      return {
        mutationFn: async (variables: unknown) => {
          await postJson('/transactions/expenses', variables as RegisterExpenseRequestDto)
        },
      }
    case 'registerNewIncome':
      return {
        mutationFn: async (variables: unknown) => {
          await postJson('/transactions/incomes', variables as RegisterIncomeRequestDto)
        },
      }
  }
}

const NOOP_QUERY: QueryConfig = {
  queryKey: ['__noop__'],
  queryFn: async () => null,
  enabled: false,
}

export function useTransactionRepository<K extends keyof TransactionRepositoryOpts>(
  method: K,
  ...opts: TransactionRepositoryOpts[K]
): RepositoryWithCache<TransactionRepository>[K] {
  const queryClient = useQueryClient()
  const config = buildConfig(method, opts as unknown[])

  const { data, isLoading, refetch } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (isMutation(config) ? NOOP_QUERY : config) as any,
  )

  const { mutate, mutateAsync, isPending, error, reset } = useMutation({
    ...(isMutation(config) ? config : { mutationFn: async () => {} }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: ['statement'] }),
        queryClient.invalidateQueries({ queryKey: ['accounts'] }),
        queryClient.invalidateQueries({ queryKey: ['category-breakdown'] }),
      ])
    },
  })

  if (isMutation(config)) {
    return {
      mutate,
      mutateAsync,
      isPending,
      error,
      reset,
    } as unknown as RepositoryWithCache<TransactionRepository>[K]
  }

  return {
    data,
    isLoading,
    retry: refetch,
  } as unknown as RepositoryWithCache<TransactionRepository>[K]
}
