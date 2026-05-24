import { useQuery } from '@tanstack/react-query'
import { Endpoints } from '../../../endpoints/endpoints.ts'
import type { CategoryRepository } from '../CategoryRepository.ts'
import type { ListCategoriesItemResponseDto } from '../dtos'
import type { RepositoryWithCache } from '../../RepositoryWithCache.ts'

function buildQueryRepositoryCategory(method: keyof CategoryRepository) {
  switch (method) {
    case 'getIncome':
      return {
        queryKey: ['categories', 'income'],
        queryFn: async () => {
          const response = await fetch(`${Endpoints.BASE_URL}/categories/income`)
          const data = (await response.json()) as { categories: ListCategoriesItemResponseDto[] }
          return data.categories
        },
      }
    case 'getExpense':
      return {
        queryKey: ['categories', 'expense'],
        queryFn: async () => {
          const response = await fetch(`${Endpoints.BASE_URL}/categories/expense`)
          const data = (await response.json()) as { categories: ListCategoriesItemResponseDto[] }
          return data.categories
        },
      }
    default:
      return undefined
  }
}

export function useCategoryRepository<K extends keyof CategoryRepository>(
  method: K,
): RepositoryWithCache<CategoryRepository>[K] {
  const { data, isLoading, refetch } = useQuery(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildQueryRepositoryCategory(method) as any,
  )
  return { data, isLoading, retry: refetch } as RepositoryWithCache<CategoryRepository>[K]
}
