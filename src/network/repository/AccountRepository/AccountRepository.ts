import type {
  EstimatedBalanceParams,
  EstimatedBalanceResponseDto,
  ListAccountsItemResponseDto,
} from './dtos'
import type { GetAccountsParams } from './dtos/GetAccountsParams.ts'

export abstract class AccountRepository {
  abstract getAccounts(params?: GetAccountsParams): Promise<ListAccountsItemResponseDto[]>
  abstract getEstimatedBalance(
    id: string,
    params?: EstimatedBalanceParams,
  ): Promise<EstimatedBalanceResponseDto>
}
