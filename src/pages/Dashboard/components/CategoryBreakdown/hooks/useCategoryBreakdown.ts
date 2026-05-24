import { endOfMonth, startOfMonth } from 'date-fns'
import type { CategoryBreakdownType } from '../../../../../network/repository/ReportingRepository/dtos/index.ts'
import { useReportingRepository } from '../../../../../network/repository/ReportingRepository/hook/useReportingRepository.ts'

export function useCategoryBreakdown(type: CategoryBreakdownType) {
  const startDate = startOfMonth(new Date()).toISOString()
  const endDate = endOfMonth(new Date()).toISOString()

  const { data, isLoading } = useReportingRepository('getCategoryBreakdown', {
    params: { startDate, endDate, effectivated: true, type },
  })

  return { categories: data?.categories ?? [], isLoading }
}
