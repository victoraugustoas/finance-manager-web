export interface ListAccountsItemResponseDto {
  id: string
  name: string
  balance: number
  openingBalance: number
  estimatedBalance: number
}

export interface ListAccountsParams {
  endDate: string
}
