import { useMemo, useState, type ReactNode } from 'react'
import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns'
import { MonthlyDateContext, type MonthlyDateContextValue } from './MonthlyDateContext.ts'

type MonthlyDateProviderProps = {
  children: ReactNode
}

function normalizeMonth(date: Date): Date {
  return startOfMonth(date)
}

export function MonthlyDateProvider({ children }: MonthlyDateProviderProps) {
  const [selectedMonth, setSelectedMonthState] = useState(() => normalizeMonth(new Date()))

  const value = useMemo<MonthlyDateContextValue>(() => {
    const monthStart = startOfMonth(selectedMonth)
    const monthEnd = endOfMonth(selectedMonth)

    return {
      selectedMonth: monthStart,
      startDate: monthStart.toISOString(),
      endDate: monthEnd.toISOString(),
      setSelectedMonth: (date) => setSelectedMonthState(normalizeMonth(date)),
      goToPreviousMonth: () => setSelectedMonthState((current) => subMonths(current, 1)),
      goToNextMonth: () => setSelectedMonthState((current) => addMonths(current, 1)),
      goToCurrentMonth: () => setSelectedMonthState(normalizeMonth(new Date())),
    }
  }, [selectedMonth])

  return <MonthlyDateContext.Provider value={value}>{children}</MonthlyDateContext.Provider>
}
