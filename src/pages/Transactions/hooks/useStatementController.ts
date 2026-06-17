import { ArrowDownToLine, ArrowLeftRight, ArrowUpFromLine, CircleDollarSign } from 'lucide-react'
import { useMemo } from 'react'
import { useMonthlyDate } from '../../../hooks/useMonthlyDate.ts'
import { useReportingRepository } from '../../../network/repository/ReportingRepository/hook/useReportingRepository.ts'
import type {
  StatementEntryResponseDto,
  StatementResponseDto,
} from '../../../network/repository/ReportingRepository/dtos/index.ts'
import type { TransactionFilter } from '../../../components/FilterBar/FilterBar.tsx'
import type { Transaction } from '../../../components/TransactionGroup/TransactionGroup.tsx'
import type { LucideIcon } from 'lucide-react'

type StatementTransaction = Transaction & {
  kind: StatementEntryResponseDto['kind']
  effectivated: boolean
  includedInBalance: boolean
  balanceDirection: StatementEntryResponseDto['balanceImpact']['direction']
  balanceAmount: number
  from?: string
  to?: string
}

export type StatementDayViewModel = {
  dayLabel: string
  balance: number
  transactions: StatementTransaction[]
}

export type StatementSummaryViewModel = {
  initialBalance: number
  finalBalance: number
  income: number
  outgo: number
  neutral: number
}

export type StatementController = {
  statement?: StatementResponseDto
  groups: StatementDayViewModel[]
  summary: StatementSummaryViewModel
  isLoading: boolean
}

const EMPTY_SUMMARY: StatementSummaryViewModel = {
  initialBalance: 0,
  finalBalance: 0,
  income: 0,
  outgo: 0,
  neutral: 0,
}

const KIND_ICON: Record<StatementEntryResponseDto['kind'], LucideIcon> = {
  INCOME: ArrowDownToLine,
  EXPENSE: ArrowUpFromLine,
  TRANSFER: ArrowLeftRight,
}

const KIND_COLOR: Record<StatementEntryResponseDto['kind'], string> = {
  INCOME: 'success.main',
  EXPENSE: 'error.main',
  TRANSFER: 'categoryColors.transport',
}

function getEntryDisplayAmount(entry: StatementEntryResponseDto) {
  if (entry.balanceImpact.direction === 'OUT') return -Math.abs(entry.balanceImpact.amount)
  if (entry.balanceImpact.direction === 'IN') return Math.abs(entry.balanceImpact.amount)
  return entry.kind === 'EXPENSE' ? -Math.abs(entry.amount) : Math.abs(entry.amount)
}

function getEntryCategory(entry: StatementEntryResponseDto) {
  if (entry.kind === 'TRANSFER') return 'Transferência'
  return entry.subCategory?.name ?? entry.category?.name ?? 'Sem categoria'
}

function getEntryAccount(entry: StatementEntryResponseDto) {
  if (entry.kind === 'TRANSFER') {
    return `${entry.originAccount?.name ?? 'Origem'} → ${entry.destinationAccount?.name ?? 'Destino'}`
  }

  return entry.account?.name ?? 'Sem conta'
}

function formatDayLabel(date: string) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  })

  return formatter.format(new Date(date)).replace('.', '')
}

function matchesFilter(entry: StatementEntryResponseDto, filter: TransactionFilter) {
  if (filter === 'in') return entry.balanceImpact.direction === 'IN'
  if (filter === 'out') return entry.balanceImpact.direction === 'OUT'
  return true
}

function matchesQuery(entry: StatementEntryResponseDto, query: string) {
  if (!query.trim()) return true

  const normalizedQuery = query.trim().toLowerCase()
  return [
    entry.name,
    entry.notes,
    entry.category?.name,
    entry.subCategory?.name,
    entry.account?.name,
    entry.originAccount?.name,
    entry.destinationAccount?.name,
  ]
    .filter(Boolean)
    .some((value) => value?.toLowerCase().includes(normalizedQuery))
}

function calculateSummary(statement?: StatementResponseDto): StatementSummaryViewModel {
  if (!statement) return EMPTY_SUMMARY

  return statement.days.reduce<StatementSummaryViewModel>(
    (summary, day) => {
      day.entries.forEach((entry) => {
        if (entry.balanceImpact.direction === 'IN') summary.income += entry.balanceImpact.amount
        if (entry.balanceImpact.direction === 'OUT') summary.outgo += entry.balanceImpact.amount
        if (entry.balanceImpact.direction === 'NEUTRAL')
          summary.neutral += entry.balanceImpact.amount
      })
      return summary
    },
    {
      initialBalance: statement.initialBalance,
      finalBalance: statement.finalBalance,
      income: 0,
      outgo: 0,
      neutral: 0,
    },
  )
}

export function useStatementController(
  query: string,
  filter: TransactionFilter,
): StatementController {
  const { startDate, endDate } = useMonthlyDate()
  const { data: statement, isLoading } = useReportingRepository('getStatement', {
    params: { startDate, endDate },
  })

  const groups = useMemo<StatementDayViewModel[]>(() => {
    if (!statement) return []

    return statement.days
      .map((day) => ({
        dayLabel: formatDayLabel(day.date),
        balance: day.balance,
        transactions: day.entries
          .filter((entry) => matchesFilter(entry, filter) && matchesQuery(entry, query))
          .map((entry) => ({
            id: entry.id,
            kind: entry.kind,
            date: entry.dueDate,
            name: entry.name,
            category: getEntryCategory(entry),
            account: getEntryAccount(entry),
            amount: getEntryDisplayAmount(entry),
            icon: KIND_ICON[entry.kind] ?? CircleDollarSign,
            iconColor: KIND_COLOR[entry.kind],
            effectivated: entry.effectivated,
            includedInBalance: entry.includedInBalance,
            balanceDirection: entry.balanceImpact.direction,
            balanceAmount: entry.balanceImpact.amount,
            from: entry.originAccount?.name,
            to: entry.destinationAccount?.name,
          })),
      }))
      .filter((day) => day.transactions.length > 0)
  }, [filter, query, statement])

  const summary = useMemo(() => calculateSummary(statement), [statement])

  return { statement, groups, summary, isLoading }
}
