import { startOfDay } from 'date-fns/startOfDay'
import { useTranslate } from './useTranslate'
import { differenceInCalendarDays } from 'date-fns/differenceInCalendarDays'

export function useFormatDateTransactions() {
  const { formatDate, formatDistance, formatRelative } = useTranslate()

  function fmtDate(iso: string): string {
    const date = new Date(iso)
    const today = startOfDay(new Date())
    const diff = differenceInCalendarDays(today, date)

    if (diff < 2) return formatRelative(date, new Date())
    if (diff >= 2 && diff <= 7) return formatDistance(date, new Date())
    return formatDate(date, { formatStr: 'd MMMM' })
  }

  return { fmtDate }
}
