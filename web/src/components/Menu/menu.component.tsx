import { Logo } from '@assets/img'
import { Broadcast, House, PlusSquare, SignOut, User } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'
import { api } from '../../hooks/useApi'
import { HostsDB } from '../../types/Query'
import { Input } from '..'

const activeColor = { color: '#548FE7' }

export const Menu = ({ active }: { active: string }) => {
  const auth = useContext(AuthContext)

  const [search, setSearch] = useState('')
  const [hosts, setHosts] = useState<Array<HostsDB>>([])

  const hostsFilter = hosts.filter((host) => search !== '' && host.hostname.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    api.get('/hosts').then((response) => setHosts(response.data))
  }, [])

  const [userMenu, setUserMenu] = useState('hidden')

  return (
    <header>
      <nav className="flex h-[64px] z-10 bg-[#202024] items-center justify-between px-8 box-border">
        <h1 className="w-[90px] h">
          <img alt="logo" src={Logo} />
        </h1>

        <ul className="flex justify-around items-center w-[35%]">
          <li
            className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold"
            style={active == 'visao geral' ? activeColor : {}}
          >
            <House size={24} />
            <Link to="/">Visão Geral</Link>
          </li>
          <li
            className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold"
            style={active == 'consultar' ? activeColor : {}}
          >
            <Broadcast size={24} />
            <Link to="/consultar">Consultar</Link>
          </li>
          <li
            className="flex items-center gap-x-1 text-[#9E9EAC] hover:text-[#548FE7] text-sm font-bold"
            style={active == 'adicionar' ? activeColor : {}}
          >
            <PlusSquare size={24} />
            <Link to="/adicionar">Adicionar</Link>
          </li>
        </ul>

        <div className="flex gap-8">
          <div className="flex flex-col relative">
            <div
              className="flex items-center gap-x-1 p-2 text-[#9E9EAC] hover:text-[#548FE7]
              cursor-pointer text-sm font-bold z-10"
              onMouseEnter={() => setUserMenu('')}
            >
              <User size={24} />
              <p>{auth.user?.name}</p>
            </div>

            <ul
              className={`flex absolute w-full flex-col pt-10 bg-gray-950 ${userMenu}`}
              onMouseLeave={() =>
                setTimeout(() => {
                  setUserMenu('hidden')
                }, 1000)
              }
            >
              <li
                className="flex items-center gap-x-1 p-2 text-[#9E9EAC]
                hover:text-[#548FE7] cursor-pointer text-sm font-bold"
                onClick={auth.signout}
              >
                {/* eslint-disable react/jsx-max-depth */}
                <SignOut size={24} />
                <p>Logout</p>
              </li>
            </ul>
          </div>

          <div className="relative">
            <Input onchange={(event) => setSearch(event.target.value)} placeholder="Pesquisar" style={{ padding: '10px' }} type="text" />

            {/*TODO: when you change the input focus, hide the search */}

            <ul className="absolute top-14 flex w-full flex-col">
              {hostsFilter.length == 0 && search.length > 0 ? (
                <li className="rounded-sm bg-[#fff] p-2 text-center">
                  <p>Sem resultados</p>
                </li>
              ) : (
                hostsFilter.map((item, index) => (
                  <li className="rounded-sm bg-[#fff] p-2" key={index}>
                    <p>
                      {item.hostname} | {item.ip}
                    </p>
                    <p>Neighbors: {item.neighbors.length}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
