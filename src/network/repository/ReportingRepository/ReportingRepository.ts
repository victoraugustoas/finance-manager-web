import type { CategoryBreakdownParams, CategoryBreakdownResponseDto } from './dtos/index.ts'

export abstract class ReportingRepository {
  abstract getCategoryBreakdown(
    params: CategoryBreakdownParams,
  ): Promise<CategoryBreakdownResponseDto>
}
