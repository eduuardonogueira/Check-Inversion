interface IMenuLateral {
    titulo: string,
    lista: [{
        nome: string
        icone: JSX.Element,
    }],
    onclick: Function 
}

export function MenuLateral({titulo, lista, onclick}:IMenuLateral) {
    return (
        <nav className=' flex flex-col bg-[#1C1C20] w-[148px] gap-8 h-[calc(100vh-156px)] p-3' >
            <h1 className='text-white w-full p-1 bg-[#121214] text-base font-bold text-center'>{titulo}</h1>
            <ul className='flex flex-col w-full gap-2'>
                {lista.map((item, index ) => (
                    <li key={index} className='flex items-center justify-start gap-1 p-1 w-full text-white font-bold hover:bg-[#044FBF]'>
                        {item.icone}
                        <p className='w-auto'>{item.nome}</p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}