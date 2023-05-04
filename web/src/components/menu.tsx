import logo from '/public/logo-poppa.png'
import { Link } from 'react-router-dom'

export function Menu() {
    return (
        <header className='flex h-[100px] w-screen z-10 bg-[#202024] items-center justify-between px-32 box-border'>
            <nav>
                <h1 className="w-[200px] h"><img src={logo} alt="logo" /></h1>
            </nav>
            <ul className='flex justify-around items-center w-[70%]'>
                <li className="text-[#E1E1E6] hover:text-[#548FE7] text-base font-bold">
                    <Link to="/consult">
                        Consulta
                    </Link>
                </li>
                <li className="text-[#E1E1E6] hover:text-[#548FE7] text-base font-bold">
                    <Link to="/monitoramento">
                        Monitoramento
                    </Link>
                </li>
                <li className="text-[#E1E1E6] hover:text-[#548FE7] text-base font-bold">
                    <Link to="/adicionar">
                        Adicionar
                    </Link>
                </li>
                <li className="text-[#E1E1E6] hover:text-[#548FE7] text-base font-bold">
                    <Link to="/servicos">
                        Serviços
                    </Link>
                </li>
            </ul>
        </header>
    )
}
