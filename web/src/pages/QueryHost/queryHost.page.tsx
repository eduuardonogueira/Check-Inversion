import { CheckInversion, CheckUptime, Menu, Panel, SideMenu } from '@components/index'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import global from '@styles/style.module.scss'
import { useState } from 'react'

export const QueryHost = () => {
  const [page, setPage] = useState<string | JSX.Element>(<CheckInversion />)

  const changeScript = (get: string | JSX.Element) => {
    setPage(get)
  }

  return (
    <>
      <Menu active="consultar" />
      <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
        <SideMenu
          changeList={changeScript}
          list={[
            {
              name: 'inversão',
              icon: <Swap size={22} />,
              get: <CheckUptime />
            },
            {
              name: 'Tempo de atividade',
              icon: <WarningCircle size={22} />,
              get: <CheckInversion />
            }
          ]}
          title="Scripts"
        />
        <Panel />
        {page}
      </div>
    </>
  )
}
