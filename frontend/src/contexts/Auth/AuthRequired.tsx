import { useContext } from "react"
import { AuthContext } from './AuthContext'
import { Navigate } from "react-router-dom"
import { LOGIN_ROUTE } from "@constants/index"

const AuthRequired = ({ children } : {children: JSX.Element }) => {
  const auth = useContext(AuthContext)

  if(!auth.user) {
    return <Navigate replace to={LOGIN_ROUTE}/>
  }

  return children
}

export default AuthRequired