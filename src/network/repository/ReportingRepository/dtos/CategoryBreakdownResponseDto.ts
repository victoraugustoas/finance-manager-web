export interface CategoryBreakdownRowDto {
  name: string
  total: number
}

export interface CategoryBreakdownResponseDto {
  categories: CategoryBreakdownRowDto[]
}
