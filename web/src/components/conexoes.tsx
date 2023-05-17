
interface IConexoes {
    consulta: {
        hostname: string,
        ip: string,
        neighbor: string,
        port: string,
        remotePort: string
    }[],
    click: Function
}

export function Conexoes({consulta, click}: IConexoes): JSX.Element {

    function enviarInformacao(i: number) {
        click(i)
    }

    return (
        <div className="flex flex-col gap-1 rounded w-full" >
            {consulta.map((item, index) => (
                <li className="flex h-min-[0px]" key={index} onClick={() => enviarInformacao(index)}>
                    <span className="bg-[#1E1E1E] text-white w-[50px] font-bold box-border flex items-center justify-center">{index + 1}</span>

                    <div className="bg-[#11346B] hover:bg-[#044FBF] cursor-pointer flex gap-6 px-6 py-2 h-full w-full text-white items-center justify-between">
                        <ul className="flex gap-3 flex-grow">
                            <li className="flex flex-col">
                                <h5 className="text-xs text-[#B9B9B9]">Nome:</h5>
                                <p>{item.hostname}</p>
                            </li>
                            <li className="flex flex-col">
                                <h5 className="text-xs text-[#B9B9B9]">Port:</h5>
                                <p>{item.port}</p>
                            </li>
                        </ul>
                        
                        <hr className="h-2 w-1/4 flex-grow w-max-[25%]"/>

                        <ul className="flex gap-3 flex-grow">
                            <li className="flex flex-col">
                                <h5 className="text-xs text-[#B9B9B9]">Nome:</h5>
                                <p>{item.neighbor}</p>
                            </li>
                            <li className="flex flex-col">
                                <h5 className="text-xs text-[#B9B9B9]">Port:</h5>
                                <p>{item.remotePort}</p>
                            </li>
                        </ul>
                    </div>
                </li>
            ))}
        </div>
    )
}