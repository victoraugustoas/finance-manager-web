import { createContext } from 'react'

export type MonthlyDateContextValue = {
  selectedMonth: Date
  startDate: string
  endDate: string
  setSelectedMonth: (date: Date) => void
  goToPreviousMonth: () => void
  goToNextMonth: () => void
  goToCurrentMonth: () => void
}

export const MonthlyDateContext = createContext<MonthlyDateContextValue | null>(null)
