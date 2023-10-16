import { Routes, Route} from 'react-router-dom'
import  { Login, VisaoGeral, Consultar, Adicionar}  from '../pages'
import { RequireAuth } from '../contexts/Auth/RequireAuth'
import { useContext } from 'react'
import { AuthContext } from '../contexts/Auth/AuthContext'

function AppRoutes() {

    const auth = useContext(AuthContext)
    
    return (
        <Routes>
            <Route path="login" element={ <Login /> } />
            <Route index element={<RequireAuth><VisaoGeral /></RequireAuth>} />
            <Route path="consultar" element={<RequireAuth><Consultar /></RequireAuth>} />
            <Route path="adicionar" element={<RequireAuth><Adicionar /></RequireAuth>} />
        </Routes>
    )
}

export default AppRoutes