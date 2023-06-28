
interface IBox {
    text: string | undefined,
    title?: string | undefined,
    click?: (dados: string) => void,
    classname?: string
}

export function Box({text, click, classname, title}:IBox){

    function enviarInformacao() {
        const informacao = text
        informacao ?  click?.(informacao) : click?.('erro')
    }

    return(
        <li 
            className={`${classname} bg-[#3E3E3E] text-[#E0E0E0] p-4 rounded text-center hover:bg-[#565656] cursor-pointer`}
            onClick={enviarInformacao}
            title={title}
        >
            {text}
        </li>
    )
}