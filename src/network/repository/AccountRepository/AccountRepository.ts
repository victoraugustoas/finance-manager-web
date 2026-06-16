import type { ListAccountsItemResponseDto, ListAccountsParams } from './dtos'

export abstract class AccountRepository {
  abstract getAccounts(params: ListAccountsParams): Promise<ListAccountsItemResponseDto[]>
}
