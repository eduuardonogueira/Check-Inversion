
interface IBox {
    text: string 
}

export function Box({text}:IBox){
    return(
        <li className="bg-[#3E3E3E] text-[#E0E0E0] p-4 rounded text-center hover:bg-[#565656]">
            {text}
        </li>
    )
}