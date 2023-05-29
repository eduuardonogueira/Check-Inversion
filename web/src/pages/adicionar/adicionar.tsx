import { Menu, MenuLateral, Painel } from '../../components'
import { Verificar } from './verificar/verificar'
import { PlusCircle, Trash } from '@phosphor-icons/react'
import global from '../../styles/style.module.scss'

export function Adicionar() {
    return (
        <>
            <Menu ativo='adicionar'/>
            
            <div className={`mx-8 mt-14 w-vw ${global.grid}`}>
                <MenuLateral 
                    titulo='Menu'
                    lista={[
                        {
                            nome: 'Adicionar',
                            icone: <PlusCircle />
                        },
                        {
                            nome: 'Remover',
                            icone: <Trash />
                        }
                    ]}
                />
                <Painel />
                <Verificar />
                
            </div>       
            
        </>
            
    )
}