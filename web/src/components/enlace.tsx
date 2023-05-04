import Switch from '/public/icon-switch.png'

export function Enlace({name, port, key}: {name: string, port: string, key: number}) {

    return (
        <ul key={key} className='flex py-3 px-6 justify-between w-[25vw] bg-[#044FBF] rounded-sm gap-6'>
            <li>
                <img src={Switch} alt="switch" />
            </li>
            <ul className='flex flex-col h-full justify-around items-center w-[55%] relative'>
                <li className='text-gray-400 flex justify-between w-full'>
                    Nome:
                    <p className='text-[#E1E1E6]'>{name}</p>
                </li>
                <li className='text-gray-400 flex justify-between w-full'>
                    Porta:
                    <p className='text-[#E1E1E6]'>{port}</p>
                </li>
            </ul>
        </ul>
    )
}