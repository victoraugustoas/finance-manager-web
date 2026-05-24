export interface ListAccountsItemResponseDto {
  id: string
  name: string
  balance: number
  openingBalance: number
  actualBalance: number
}

export interface EstimatedBalanceParams {
  startDate?: string
  endDate?: string
}

export interface EstimatedBalanceResponseDto {
  estimatedBalance: number
}

export abstract class AccountRepository {
  abstract getAccounts(): Promise<ListAccountsItemResponseDto[]>
  abstract getEstimatedBalance(
    id: string,
    params?: EstimatedBalanceParams,
  ): Promise<EstimatedBalanceResponseDto>
}
