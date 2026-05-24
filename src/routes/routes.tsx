import type { RouteObject } from 'react-router-dom'
import { CategoriesPage } from '../pages/CategoriesPage'
import { DashboardPage } from '../pages/Dashboard/DashboardPage.tsx'
import { ReportsPage } from '../pages/ReportsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { TransactionsPage } from '../pages/TransactionsPage'

export const appRoutes: RouteObject[] = [
  { path: '/', element: <DashboardPage /> },
  { path: '/transactions', element: <TransactionsPage /> },
  { path: '/reports', element: <ReportsPage /> },
  { path: '/categories', element: <CategoriesPage /> },
  { path: '/settings', element: <SettingsPage /> },
]
