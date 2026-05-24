export interface ListCategoriesSubCategoryResponseDto {
  id: string
  name: string
}

export interface ListCategoriesItemResponseDto {
  id: string
  name: string
  type: 'INCOME' | 'EXPENSE'
  subCategories: ListCategoriesSubCategoryResponseDto[]
}
