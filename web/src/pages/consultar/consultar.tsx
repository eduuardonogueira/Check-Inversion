import { Menu, MenuLateral, Painel, Button, Input } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import style from './style.module.scss'

export function Consultar() {

    function inversao() {

    }

    return (
        <>
            <Menu ativo="consultar"/>
            <div className={`mx-8 mt-14 w-vw ${style.grid}`}>
                <MenuLateral 
                    titulo='Scripts'
                    lista={[{
                        nome: "inversão",
                        icone: <Swap size={22}/>
                    },{
                        nome: "Tempo de atividade",
                        icone: <WarningCircle size={22}/>
                    }]}
                    onclick={inversao}
                />
                <Painel />
                <main className='bg-[#1C1C20]'>

                </main>
            </div>
        </>
    )

}