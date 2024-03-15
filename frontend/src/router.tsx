import { Suspense, lazy } from "react"
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "./constants"

import { Route, Routes } from 'react-router-dom' 
import AuthRequired from "@contexts/Auth/AuthRequired"
import Dashboard from "@pages/Dashboard/dashboard.page"

const RouterAllRoutes = () => {
  const Login = lazy(() => import('@pages/Login/login.page'))


  return (
    <>
      {/* Header */}
      <Suspense>
        <Routes>
          <Route element={<Login />} path={LOGIN_ROUTE}></Route>


          <Route element={<AuthRequired><Dashboard /></AuthRequired>} path={DASHBOARD_ROUTE}></Route>
        </Routes>
      </Suspense>

    </>
  )
}

export default RouterAllRoutes