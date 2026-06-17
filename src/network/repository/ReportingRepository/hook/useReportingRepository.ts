import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { ReportingRepository } from '../ReportingRepository.ts'
import type {
  CategoryBreakdownParams,
  CategoryBreakdownResponseDto,
  StatementParams,
  StatementResponseDto,
} from '../dtos/index.ts'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'

type ReportingRepositoryOpts = {
  getCategoryBreakdown: [{ params: CategoryBreakdownParams }]
  getStatement: [{ params: StatementParams }]
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

function buildQueryRepositoryReporting(method: keyof ReportingRepository, opts: unknown[]) {
  switch (method) {
    case 'getCategoryBreakdown': {
      const { params } = opts[0] as { params: CategoryBreakdownParams }
      return {
        queryKey: ['reporting', 'categories', 'breakdown', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/reporting/categories/breakdown`)
          url.searchParams.set('startDate', params.startDate)
          url.searchParams.set('endDate', params.endDate)
          url.searchParams.set('effectivated', String(params.effectivated))
          url.searchParams.set('type', params.type)
          if (params.categoriesId?.length) {
            url.searchParams.set('categoriesId', params.categoriesId.join(','))
          }
          return fetchJson<CategoryBreakdownResponseDto>(url)
        },
        enabled: !!params.startDate && !!params.endDate,
      }
    }
    case 'getStatement': {
      const { params } = opts[0] as { params: StatementParams }
      return {
        queryKey: ['reporting', 'statement', params],
        queryFn: async () => {
          const url = new URL(`${Endpoints.BASE_URL}/reporting/statement`)
          url.searchParams.set('startDate', params.startDate)
          url.searchParams.set('endDate', params.endDate)
          if (params.accountId) url.searchParams.set('accountId', params.accountId)
          return fetchJson<StatementResponseDto>(url)
        },
        enabled: !!params.startDate && !!params.endDate,
      }
    }
    default:
      return undefined
  }
}

export function useReportingRepository<K extends keyof ReportingRepositoryOpts>(
  method: K,
  ...opts: ReportingRepositoryOpts[K]
): RepositoryWithCache<ReportingRepository>[K] {
  const { data, isLoading, refetch } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildQueryRepositoryReporting(method, opts as unknown[]) as any,
  )
  return { data, isLoading, retry: refetch } as RepositoryWithCache<ReportingRepository>[K]
}
