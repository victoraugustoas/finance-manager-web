import type { ListCategoriesItemResponseDto } from './dtos/index.ts'

export abstract class CategoryRepository {
  abstract getIncome(): Promise<ListCategoriesItemResponseDto[]>
  abstract getExpense(): Promise<ListCategoriesItemResponseDto[]>
}
