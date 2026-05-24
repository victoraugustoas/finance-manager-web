import { endOfMonth, startOfMonth } from 'date-fns'
import type { TransactionRepository } from '../../../../../network/repository/TransactionRepository/TransactionRepository.ts'
import { useTransactionRepository } from '../../../../../network/repository/TransactionRepository/hook/useTransactionRepository.ts'
import { differenceInDays } from 'date-fns/differenceInDays'

export type TransactionListType = 'income' | 'expense' | 'transfer'

const MAX_ITEMS = 10

const METHOD_MAP = {
  income: 'getIncomes',
  expense: 'getExpenses',
  transfer: 'getTransfers',
} as const

export type TransactionListResult =
  | {
      type: 'income'
      items: Awaited<ReturnType<TransactionRepository['getIncomes']>>
      isLoading: boolean
    }
  | {
      type: 'expense'
      items: Awaited<ReturnType<TransactionRepository['getExpenses']>>
      isLoading: boolean
    }
  | {
      type: 'transfer'
      items: Awaited<ReturnType<TransactionRepository['getTransfers']>>
      isLoading: boolean
    }

export function useTransactionList(type: TransactionListType): TransactionListResult {
  const method = METHOD_MAP[type]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useTransactionRepository(method as any, {
    startDate: startOfMonth(new Date()).toISOString(),
    endDate: endOfMonth(new Date()).toISOString(),
  })

  const items = (data ?? [])
    .slice(0, MAX_ITEMS)
    .sort((a: { dueDate: string }, b: { dueDate: string }) =>
      differenceInDays(new Date(b.dueDate), new Date(a.dueDate)),
    )

  return { type, items, isLoading }
}
