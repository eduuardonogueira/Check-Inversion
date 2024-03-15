import { Menu, MenuLateral, Painel } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import global from '../../styles/style.module.scss'
import { Inversao } from './Inversao/'
import { useState } from 'react'
import { UpTime } from './UpTime'

export const Consultar = () => {
    const [ page, setPage ] = useState<string | any>(< Inversao />)

    const changeScript = (get: string | any) => {

        setPage(get)
    }

    return (
        <>
            < Menu active="consultar" />
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                < MenuLateral 
                    title='Scripts'
                    list={[{
                        name: "inversão",
                        icon: <Swap size={22}/>,
                        get: < Inversao />
                    },{
                        name: "Tempo de atividade",
                        icon: <WarningCircle size={22}/>,
                        get: < UpTime />
                    }]}
                    changeList={changeScript}
                />
                < Painel />
                {page}
            </div>
        </>
    )

}