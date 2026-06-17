export interface RegisterIncomeRequestDto {
  name: string
  amount: number
  dueDate: string
  entryDate: string
  receiptDate?: string
  effectivated: boolean
  accountId: string
  categoryId: string
  subCategoryId: string
  notes?: string
}

export interface RegisterExpenseRequestDto {
  name: string
  amount: number
  dueDate: string
  entryDate: string
  paymentDate?: string
  effectivated: boolean
  accountId: string
  categoryId: string
  subCategoryId: string
  notes?: string
}
