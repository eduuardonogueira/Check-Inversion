import logo from '/src/img/logo-poppa-new.png'
import { Link } from 'react-router-dom'
import { Input } from './'
import { Broadcast, HardDrives, House, PlusSquare } from '@phosphor-icons/react'
import { api } from '../lib/axios'
import { useState, useEffect } from 'react'
import { HostsDB } from '../types/queryTypes'

const activeColor = {color: "#548FE7"}

export function Menu ({ active }:{active: string}) {
    const [ search, setSearch ] = useState('')
    const [ hosts, setHosts ] = useState<Array<HostsDB>>([])

    const hostsFilter = hosts.filter( host => search !== '' && host.hostname.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        api.get('/hosts').then((response) => (setHosts(response.data), console.log(response.data)))
    }, [])

 
    return (
        <header>
            <nav className='flex h-[64px] z-10 bg-[#202024] items-center justify-between px-8 box-border'>
                <h1 className="w-[120px] h"><img src={logo} alt="logo" /></h1>
            
                <ul className='flex justify-around items-center w-[50%]'>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold" style={active == 'visao geral'? activeColor : {}}>
                        <House size={24} />
                        <Link to="/">
                            Visão Geral
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold" style={active == 'consultar'? activeColor : {}}>
                        <Broadcast size={24}/>
                        <Link to="/consultar">
                            Consultar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold" style={active == 'adicionar'? activeColor : {}}>
                        <PlusSquare size={24}/>
                        <Link to="/adicionar">
                            Adicionar
                        </Link>
                    </li>
                    <li className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold" style={active == 'servicos'? activeColor : {}}>
                        <HardDrives size={24}/>
                        <Link to="/servicos">
                            Serviços
                        </Link>
                    </li>
                </ul>

                <div className='flex w-[20%] flex-col relative'>
                    <Input 
                        style={{}}
                        type='text'
                        placeholder='Pesquisar'
                        onchange={(event) => (setSearch(event.target.value))}
                    />
                    
                    {/*TODO: when you change the input focus, hide the search */}

                    <ul className='absolute top-14 flex w-full flex-col '>
                        {hostsFilter.map((item, index) => (
                            <li 
                                className='rounded-sm bg-[#fff] p-2' 
                                key={index}
                            > 
                                <p>{item.hostname} | {item.ip}</p>
                                <p>Neighbors: {item.neighbors.length}</p> 
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
} 
