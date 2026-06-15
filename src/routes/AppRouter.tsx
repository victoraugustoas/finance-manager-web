import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout/AppLayout'
import { appRoutes } from './routes'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout userName="Marina" userEmail="marina@pluma.app" />}>
          {appRoutes.map(({ path, element }) => (
            <Route key={path as string} path={path as string} element={element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
