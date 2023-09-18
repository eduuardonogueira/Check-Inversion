import { Menu, MenuLateral, Painel } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import global from '../../styles/style.module.scss'
import { CheckInversion } from './inversao/inversao'

export function Consultar() {

    return (
        <>
            <Menu ativo="consultar"/>
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                <MenuLateral 
                    titulo='Scripts'
                    lista={[{
                        nome: "inversão",
                        icone: <Swap size={22}/>,
                    },{
                        nome: "Tempo de atividade",
                        icone: <WarningCircle size={22}/>,
                    }]}

                />
                <Painel />
                < CheckInversion />
            </div>
        </>
    )

}