import { CheckHost, Menu, Panel, SideMenu } from '@components/index'
import { PlusCircle, Trash } from '@phosphor-icons/react'

import global from '../../styles/style.module.scss'

export const AddHost = () => {
  return (
    <>
      <Menu active="adicionar" />
      <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
        <SideMenu
          list={[
            {
              name: 'Adicionar',
              icon: <PlusCircle />
            },
            {
              name: 'Remover',
              icon: <Trash />
            }
          ]}
          title="Menu"
        />
        <Panel />
        <CheckHost />
      </div>
    </>
  )
}
