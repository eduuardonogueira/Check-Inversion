import { Menu, MenuLateral, Painel } from '../../components'
import { Verificar } from './Verificar'
import { PlusCircle, Trash } from '@phosphor-icons/react'
import global from '../../styles/style.module.scss'

export const Adicionar = () => {
  return (
    <>
      <Menu active="adicionar" />
      <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
        <MenuLateral
          title="Menu"
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
        />
        <Painel />
        <Verificar />
      </div>
    </>
  )
}
