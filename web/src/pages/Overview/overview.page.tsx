import { Menu, Panel, SideMenu } from '@components/index'
import { api } from '@hooks/useApi'
import { CheckCircle, Clock, DownloadSimple, Export, HardDrive, Question, Swap, User, WarningCircle } from '@phosphor-icons/react'
import global from '@styles/style.module.scss'
import moment from 'moment'
import { useEffect, useState } from 'react'

import style from './styles.module.scss'

// Set the location to the moment
moment.locale('pt-br')

export const Overview = () => {
  type QueryHost = {
    hostname: string
    ip: string
    NeighborQueries: {
      hostname: string
      port: string
      remotePort: string
      status: string
      createdAt: string
    }[]
    createdAt: string
  }

  const [queryHosts, setQueryHosts] = useState<QueryHost[]>([])
  const [request, setRequest] = useState<string>('/todos')
  const formatedData = (data: string) => moment.utc(data).utcOffset(0).format('HH:mm:ss DD-MM-YYYY')

  const changeList = (get: string | JSX.Element) => {
    get === 'string' ? setRequest(get) : ''
  }

  useEffect(() => {
    api.get(request).then((response) => {
      setQueryHosts(response.data), console.log(response.data)
    })
  }, [request])

  return (
    <>
      <Menu active="visao geral" />
      <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
        <SideMenu
          changeList={changeList}
          list={[
            {
              name: 'Todos',
              icon: <User size={22} />,
              get: '/todos'
            },
            {
              name: 'Invertidos',
              icon: <WarningCircle size={22} />,
              get: '/invertidos'
            },
            {
              name: 'Check-Ok',
              icon: <CheckCircle size={22} />,
              get: '/check-ok'
            }
          ]}
          title="Menu"
        />
        <Panel />
        <main>
          <h2>
            <ul className={style.hostColumn}>
              <li>
                {/* eslint-disable react/jsx-max-depth*/}
                <p>Host</p>
                <HardDrive size={22} />
              </li>
              <li>
                <p>Neighbors</p>
                <Swap size={22} />
              </li>
              <li>
                <p>Port</p>
                <Export size={22} />
              </li>
              <li>
                <p>Remote Port</p>
                <DownloadSimple size={22} />
              </li>
              <li>
                <p>Last Check</p>
                <Clock size={22} />
              </li>
              <li>
                <p>Status</p>
                <Question size={22} />
              </li>
            </ul>
          </h2>
          <article className="overflow-auto h-[calc(100vh-297px)]">
            {queryHosts.map((host, index) => (
              <ul className={style.host} key={index}>
                {host.NeighborQueries.length == 0 ? (
                  ''
                ) : (
                  <li className={`${style.hostname} ${host.NeighborQueries.find((vizinho) => vizinho.status !== 'Ok') ? style.hostInvertido : ''}`}>
                    {host.hostname}
                  </li>
                )}
                <li>
                  {host.NeighborQueries.map((neighbor, index) => (
                    <ul key={index}>
                      <div className={`${style.enlace} ${neighbor.status !== 'Ok' ? style.invertido : ''}`}>
                        <li>{neighbor.hostname}</li>
                        <li>{neighbor.port}</li>
                        <li>{neighbor.remotePort}</li>
                        <li>{formatedData(neighbor.createdAt)}</li>
                        <li>{neighbor.status}</li>
                      </div>
                    </ul>
                  ))}
                </li>
              </ul>
            ))}
            {queryHosts.length == 0 ? <span className={style.aviso}> Nenhuma inversão na rede </span> : <span>{queryHosts.length}</span>}
          </article>
        </main>
      </div>
    </>
  )
}
