import logo from '/public/img/logo-poppa.png'
import { Link } from 'react-router-dom'
import { Input } from './'
import { Broadcast, HardDrives, House, PlusSquare } from '@phosphor-icons/react'

export function Menu({ativo}:{ativo: string}) {

    const active = {color: "#548FE7"}

    return (
        <header>
            <nav className='flex h-[100px] w-screen z-10 bg-[#202024] items-center justify-between px-8 box-border'>
                <h1 className="w-[200px] h"><img src={logo} alt="logo" /></h1>
            
                <ul className='flex justify-around items-center w-[50%]'>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={ativo == 'visao geral'? active : {}}>
                        <House size={24} />
                        <Link to="/">
                            Visão Geral
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={ativo == 'consultar'? active : {}}>
                        <Broadcast size={24}/>
                        <Link to="/consultar">
                            Consultar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={ativo == 'adicionar'? active : {}}>
                        <PlusSquare size={24}/>
                        <Link to="/adicionar">
                            Adicionar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={ativo == 'servicos'? active : {}}>
                        <HardDrives size={24}/>
                        <Link to="/servicos">
                            Serviços
                        </Link>
                    </li>
                </ul>

                <Input 
                    style={{width: "20"}}
                    type='text'
                    placeholder='Pesquisar'
                />
            </nav>
        </header>
    )
}
