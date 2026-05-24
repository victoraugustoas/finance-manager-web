import {
  ArrowDownToLine,
  Bus,
  Gamepad2,
  HeartPulse,
  Home,
  MoreHorizontal,
  ShoppingCart,
  Utensils,
} from 'lucide-react'
import type { CategoryBreakdownItem } from '../components/CategoryBreakdown/CategoryBreakdown'
import type { CategoryTableRow } from '../components/CategoryTable/CategoryTable'
import type { DonutSegment } from '../components/DonutChart/DonutChart'
import type { Transaction } from '../components/TransactionGroup/TransactionGroup'
import { categoryColors } from '../theme/pluma'

export const ACCOUNTS = [
  { id: 'nu',    name: 'Nubank',        tail: '4231', type: 'credit'   as const, balance: 4382.15, limit: 8000 },
  { id: 'inter', name: 'Inter',         tail: '2810', type: 'checking' as const, balance: 12480.90 },
  { id: 'itau',  name: 'Itaú poupança', tail: '0193', type: 'savings'  as const, balance: 28900.00 },
]

export const CATEGORIES_META = [
  { id: 'grocery',   name: 'Mercado',     icon: ShoppingCart,    color: categoryColors.grocery,   budget: 1200 },
  { id: 'transport', name: 'Transporte',  icon: Bus,             color: categoryColors.transport, budget: 400 },
  { id: 'home',      name: 'Casa',        icon: Home,            color: categoryColors.home,      budget: 2200 },
  { id: 'leisure',   name: 'Lazer',       icon: Gamepad2,        color: categoryColors.leisure,   budget: 300 },
  { id: 'health',    name: 'Saúde',       icon: HeartPulse,      color: categoryColors.health,    budget: 350 },
  { id: 'food',      name: 'Alimentação', icon: Utensils,        color: categoryColors.food,      budget: 600 },
  { id: 'salary',    name: 'Salário',     icon: ArrowDownToLine, color: categoryColors.salary,    budget: undefined },
  { id: 'other',     name: 'Outros',      icon: MoreHorizontal,  color: categoryColors.other,     budget: 200 },
]

export const RAW_TRANSACTIONS = [
  { id: 't1',  date: 'hoje',   name: 'iFood',        categoryId: 'food',      accountId: 'nu',    amount: -38.90 },
  { id: 't2',  date: 'hoje',   name: 'Uber',         categoryId: 'transport', accountId: 'nu',    amount: -22.40 },
  { id: 't3',  date: 'ontem',  name: 'Mercado Pago', categoryId: 'grocery',   accountId: 'inter', amount: -124.50 },
  { id: 't4',  date: 'ontem',  name: 'Netflix',      categoryId: 'leisure',   accountId: 'nu',    amount: -55.90 },
  { id: 't5',  date: '21 mai', name: 'Posto Shell',  categoryId: 'transport', accountId: 'nu',    amount: -210.00 },
  { id: 't6',  date: '20 mai', name: 'Salário',      categoryId: 'salary',    accountId: 'inter', amount: 6200.00 },
  { id: 't7',  date: '19 mai', name: 'Farmácia',     categoryId: 'health',    accountId: 'nu',    amount: -84.20 },
  { id: 't8',  date: '18 mai', name: 'Aluguel',      categoryId: 'home',      accountId: 'inter', amount: -1850.00 },
  { id: 't9',  date: '17 mai', name: 'Padaria',      categoryId: 'food',      accountId: 'nu',    amount: -28.50 },
  { id: 't10', date: '15 mai', name: 'Amazon',       categoryId: 'leisure',   accountId: 'nu',    amount: -149.00 },
]

function toTransaction(raw: typeof RAW_TRANSACTIONS[number]): Transaction {
  const cat  = CATEGORIES_META.find(c => c.id === raw.categoryId)!
  const acct = ACCOUNTS.find(a => a.id === raw.accountId)!
  return {
    id: raw.id,
    date: raw.date,
    name: raw.name,
    category: cat.name,
    account: acct.name,
    amount: raw.amount,
    icon: cat.icon,
    iconColor: cat.color,
  }
}

export const TRANSACTIONS: Transaction[] = RAW_TRANSACTIONS.map(toTransaction)

export const INCOME  = RAW_TRANSACTIONS.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0)
export const OUTGO   = Math.abs(RAW_TRANSACTIONS.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0))
export const BALANCE = ACCOUNTS.reduce((s, a) => s + a.balance, 0)

export const BREAKDOWN: CategoryBreakdownItem[] = CATEGORIES_META
  .filter(c => c.id !== 'salary')
  .map(c => ({
    id: c.id,
    name: c.name,
    color: c.color,
    total: Math.abs(
      RAW_TRANSACTIONS.filter(t => t.categoryId === c.id && t.amount < 0).reduce((s, t) => s + t.amount, 0)
    ),
  }))
  .filter(c => c.total > 0)
  .sort((a, b) => b.total - a.total)
  .slice(0, 5)

const breakdownTotal = BREAKDOWN.reduce((s, b) => s + b.total, 0)

export const DONUT_SEGMENTS: DonutSegment[] = BREAKDOWN.map(b => ({
  id: b.id, label: b.name, color: b.color, value: b.total,
}))

export const TABLE_ROWS: CategoryTableRow[] = BREAKDOWN.map(b => ({
  id: b.id,
  name: b.name,
  icon: CATEGORIES_META.find(c => c.id === b.id)!.icon,
  iconColor: b.color,
  total: b.total,
  count: RAW_TRANSACTIONS.filter(t => t.categoryId === b.id && t.amount < 0).length,
  pct: breakdownTotal > 0 ? (b.total / breakdownTotal) * 100 : 0,
}))

export function groupByDay(txs: Transaction[]) {
  const map: Record<string, Transaction[]> = {}
  txs.forEach(t => { (map[t.date] ??= []).push(t) })
  return Object.entries(map).map(([dayLabel, transactions]) => ({ dayLabel, transactions }))
}
