import { Menu, MenuLateral, Painel } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import global from '../../styles/style.module.scss'
import { Inversao } from './Inversao/'

export const Consultar = () => {
    return (
        <>
            < Menu active="consultar" />
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                < MenuLateral 
                    title='Scripts'
                    list={[{
                        name: "inversão",
                        icon: <Swap size={22}/>,
                    },{
                        name: "Tempo de atividade",
                        icon: <WarningCircle size={22}/>,
                    }]}
                />
                < Painel />
                < Inversao />
            </div>
        </>
    )

}