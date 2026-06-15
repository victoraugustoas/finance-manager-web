import { useContext } from 'react'
import { MonthlyDateContext } from '../contexts/MonthlyDateContext.ts'

export function useMonthlyDate() {
  const context = useContext(MonthlyDateContext)

  if (!context) {
    throw new Error('useMonthlyDate must be used within MonthlyDateProvider')
  }

  return context
}
