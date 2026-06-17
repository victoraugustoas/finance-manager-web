export interface StatementAccountResponseDto {
  id: string
  name: string
}

export interface StatementCategoryResponseDto {
  id: string
  name: string
}

export interface StatementBalanceImpactResponseDto {
  direction: 'IN' | 'OUT' | 'NEUTRAL'
  amount: number
}

export interface StatementEntryResponseDto {
  id: string
  kind: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  name: string
  amount: number
  dueDate: string
  entryDate: string
  effectivated: boolean
  effectivatedDate?: string | null
  notes?: string | null
  account?: StatementAccountResponseDto
  originAccount?: StatementAccountResponseDto
  destinationAccount?: StatementAccountResponseDto
  category?: StatementCategoryResponseDto
  subCategory?: StatementCategoryResponseDto
  balanceImpact: StatementBalanceImpactResponseDto
  includedInBalance: boolean
}

export interface StatementDayResponseDto {
  date: string
  balance: number
  entries: StatementEntryResponseDto[]
}

export interface StatementResponseDto {
  startDate: string
  endDate: string
  accountId?: string
  initialBalance: number
  finalBalance: number
  days: StatementDayResponseDto[]
}
