export type CategoryBreakdownType = 'INCOME' | 'EXPENSE'

export interface CategoryBreakdownParams {
  startDate: string
  endDate: string
  effectivated: boolean
  type: CategoryBreakdownType
  categoriesId?: string[]
}
