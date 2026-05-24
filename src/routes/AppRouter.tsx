import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddTransactionModal } from '../components/AddTransactionModal/AddTransactionModal'
import { AppLayout } from '../components/AppLayout/AppLayout'
import { ACCOUNTS, CATEGORIES_META } from '../mocks/data'
import { appRoutes } from './routes'

export function AppRouter() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <AppLayout
              userName="Marina"
              userEmail="marina@pluma.app"
              onAdd={() => setModalOpen(true)}
            />
          }
        >
          {appRoutes.map(({ path, element }) => (
            <Route key={path as string} path={path as string} element={element} />
          ))}
        </Route>
      </Routes>

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        accounts={ACCOUNTS.map(a => ({ id: a.id, name: a.name }))}
        categories={CATEGORIES_META.map(c => ({ id: c.id, name: c.name, color: c.color }))}
      />
    </BrowserRouter>
  )
}
