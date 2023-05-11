import { Routes, Route} from 'react-router-dom'
import  { Login, VisaoGeral, Consultar, Adicionar, Servicos}  from '../pages'

function AppRoutes() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route index element={< VisaoGeral/>} />
            <Route path="consultar" element={<Consultar/>} />
            <Route path="adicionar" element={<Adicionar/>} />
            <Route path="servicos" element={<Servicos/>} />
        </Routes>
    )
}

export default AppRoutes