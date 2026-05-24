export interface ListExpenseItemResponseDto {
  id: string
  name: string
  amount: number
  categoryId: string
  categoryName: string
  subCategoryId: string
  subCategoryName: string
  notes?: string
  dueDate: string
  entryDate: string
  paymentDate?: string
  effectivated: boolean
  accountId: string
  accountName: string
}
