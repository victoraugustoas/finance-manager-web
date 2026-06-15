import { useMonthlyDate } from '../../../../../hooks/useMonthlyDate.ts'
import type { CategoryBreakdownType } from '../../../../../network/repository/ReportingRepository/dtos/index.ts'
import { useReportingRepository } from '../../../../../network/repository/ReportingRepository/hook/useReportingRepository.ts'

export function useCategoryBreakdown(type: CategoryBreakdownType) {
  const { startDate, endDate } = useMonthlyDate()

  const { data, isLoading } = useReportingRepository('getCategoryBreakdown', {
    params: { startDate, endDate, effectivated: true, type },
  })

  return { categories: data?.categories ?? [], isLoading }
}
