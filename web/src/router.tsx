import { RequireAuth } from '@contexts/Auth/RequireAuth'
import { AddHost, Login, Overview, QueryHost } from '@pages/index'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
// import { useContext } from 'react'
// import { AuthContext } from '@contexts/Auth/AuthContext'

const RouterAllRoutes = () => {
  // const auth = useContext(AuthContext)
  return (
    <Suspense fallback="">
      <Routes>
        <Route element={<Login />} path="login" />
        <Route
          element={
            <RequireAuth>
              <Overview />
            </RequireAuth>
          }
          index
        />
        <Route
          element={
            <RequireAuth>
              <QueryHost />
            </RequireAuth>
          }
          path="consultar"
        />
        <Route
          element={
            <RequireAuth>
              <AddHost />
            </RequireAuth>
          }
          path="adicionar"
        />
      </Routes>
    </Suspense>
  )
}

export default RouterAllRoutes
