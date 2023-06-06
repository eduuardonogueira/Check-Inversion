import { useState } from "react"

interface Objeto {
    nome: string,
    icone: JSX.Element,
    get: string
}

interface IMenuLateral {
    titulo: string,
    lista: Objeto[],
    alterarLista: (get: string) => void
}


export function MenuLateral({titulo, lista, alterarLista }:IMenuLateral): JSX.Element {

    function setarLista(lista: string) {
        alterarLista(lista)
    }


    const [ ativo, setAtivo ] = useState<string[]>(() => {
        const array = []
        for(let i = 0; i < lista.length; i++) {i == 0 ? array.push("#044FBF") : array.push("transparent")}
        return array
    });

    const clickMenu = (index: number): void => {
        var newAtivo = [...ativo]

        if (newAtivo[index] == 'transparent'){
            newAtivo.fill('transparent')
            newAtivo[index] = '#044FBF'
        }else{
            newAtivo[index] = 'transparent'
        }
        
        setAtivo(newAtivo)
    }

    return (
        <nav className=' flex flex-col bg-[#1C1C20] w-[148px] gap-8 h-[calc(100vh-156px)] p-3' >
            <h1 className='text-white w-full p-1 bg-[#121214] text-base font-bold text-center'>{titulo}</h1>
            <ul className='flex flex-col w-full gap-2'>
                {lista.map((item, index ) => (
                    <li 
                        key={index} 
                        className='flex items-center justify-start gap-1 p-1 w-full text-white font-bold hover:bg-[#044FBF] hover:cursor-pointer'
                        onClick={ () => (clickMenu(index), setarLista(item.get))}
                        style={{ backgroundColor: ativo[index] } as any}
                    >
                        {item.icone}
                        <p className='w-auto'>{item.nome}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}