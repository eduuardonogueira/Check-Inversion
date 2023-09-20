import logo from '/src/img/logo-poppa-new.png'
import { Link } from 'react-router-dom'
import { Input } from './'
import { Broadcast, HardDrives, House, PlusSquare } from '@phosphor-icons/react'

const activeColor = {color: "#548FE7"}

export const Menu = ({ active }:{active: string}) => (
    <header>
            <nav className='flex h-[100px] z-10 bg-[#202024] items-center justify-between px-8 box-border'>
                <h1 className="w-[120px] h"><img src={logo} alt="logo" /></h1>
            
                <ul className='flex justify-around items-center w-[50%]'>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={active == 'visao geral'? activeColor : {}}>
                        <House size={24} />
                        <Link to="/">
                            Visão Geral
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={active == 'consultar'? activeColor : {}}>
                        <Broadcast size={24}/>
                        <Link to="/consultar">
                            Consultar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={active == 'adicionar'? activeColor : {}}>
                        <PlusSquare size={24}/>
                        <Link to="/adicionar">
                            Adicionar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-base font-bold" style={active == 'servicos'? activeColor : {}}>
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
