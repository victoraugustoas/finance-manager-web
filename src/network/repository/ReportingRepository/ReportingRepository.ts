import type {
  CategoryBreakdownParams,
  CategoryBreakdownResponseDto,
  StatementParams,
  StatementResponseDto,
} from './dtos/index.ts'

export abstract class ReportingRepository {
  abstract getCategoryBreakdown(
    params: CategoryBreakdownParams,
  ): Promise<CategoryBreakdownResponseDto>

  abstract getStatement(params: StatementParams): Promise<StatementResponseDto>
}
