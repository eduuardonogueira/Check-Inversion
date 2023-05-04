import { Routes, Route} from 'react-router-dom'
import  { Dashboard, Login, Consult, Monitoramento, Adicionar }  from '../pages'

function AppRoutes() {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path="consult" element={<Consult/>} />
            <Route path="monitoramento" element={<Monitoramento/>} />
            <Route path="adicionar" element={<Adicionar/>} />
            <Route path="login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes