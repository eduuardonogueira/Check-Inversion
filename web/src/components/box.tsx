
interface IBox {
    text: string,
    click?: (dados: string) => void
    classname?: string
}

export function Box({text, click, classname}:IBox){

    function enviarInformacao() {
        const informacao = text
        click?.(informacao)
    }

    return(
        <li 
            className={`${classname} bg-[#3E3E3E] text-[#E0E0E0] p-4 rounded text-center hover:bg-[#565656] cursor-pointer`}
            onClick={enviarInformacao}
        >
            {text}
        </li>
    )
}