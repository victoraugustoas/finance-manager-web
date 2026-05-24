import type {
  EstimatedBalanceParams,
  EstimatedBalanceResponseDto,
  ListAccountsItemResponseDto,
} from './dtos'

export abstract class AccountRepository {
  abstract getAccounts(): Promise<ListAccountsItemResponseDto[]>
  abstract getEstimatedBalance(
    id: string,
    params?: EstimatedBalanceParams,
  ): Promise<EstimatedBalanceResponseDto>
}
