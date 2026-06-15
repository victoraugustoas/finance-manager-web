import type { Mutation } from '../RepositoryWithCache.ts'
import type {
  ListExpenseItemResponseDto,
  ListIncomeItemResponseDto,
  ListTransferItemResponseDto,
  TransactionParams,
} from './dtos/index.ts'

export abstract class TransactionRepository {
  abstract getExpenses(params?: TransactionParams): Promise<ListExpenseItemResponseDto[]>
  abstract getIncomes(params?: TransactionParams): Promise<ListIncomeItemResponseDto[]>
  abstract getTransfers(params?: TransactionParams): Promise<ListTransferItemResponseDto[]>
  abstract registerNewExpense(data: { name: boolean }): Mutation<{ name: boolean }, void>
}
