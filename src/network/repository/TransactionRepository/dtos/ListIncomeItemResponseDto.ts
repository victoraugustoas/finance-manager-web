export interface ListIncomeItemResponseDto {
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
  receiptDate?: string
  effectivated: boolean
  accountId: string
  accountName: string
}
