import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import { Login } from "../../pages";

export const RequireAuth = ({ children }: { children: JSX.Element}) => {
    const auth = useContext(AuthContext);

    if(!auth.user){
        return <Login />
    }
    
    return children
}