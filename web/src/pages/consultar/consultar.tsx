import { Menu, MenuLateral, Painel, Button, Input, Box, Conexoes } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import style from './style.module.scss'
import { api } from '../../lib/axios'
import { FormEvent, useState } from 'react'

export function Consultar() {
    const valor = [{
        hostname: '',
        ip: '',
        neighbor: '',
        port: '',
        remotePort: ''
    }]


    const [ ip, setIp ] = useState<string>('')
    const [ consulta, setConsulta ] = useState(valor)
    const [ recentes, setRecentes ] = useState(Array<string>)

    async function consultarHost(event: FormEvent){
        event.preventDefault()

        if(ip.length ==0){
            return
        }

        await api.post('consultar', { ip }).then(response => setConsulta(response.data))
        setRecentes( recentesAntigos => [ ...recentesAntigos, ip])
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
                />
                <Painel />
                <main className={`bg-[#1C1C20] px-3 ${style.painel}`}>
                    <section className="flex flex-col">
                        <h1 className={style.titulo}>Consultar Host</h1>
                        <div className='flex justify-between h-[230px]'>
                            <form onSubmit={consultarHost} className='flex flex-col w-[calc(70%-8px)] h-full gap-1 justify-between'>
                                <p className='text-[#9E9EAC] text-sm w-[85%]'>Consulte os vizinhos que fazem conexões com o switch e obtenha informações detalhadas sobre os enlaces.</p>
                                
                                <div className='flex flex-col gap-1'>
                                <label htmlFor="ip" className='text-[#DADADA] text-sm font-bold mt-2 mb-1'>Digite o IP do host:</label>
                                    <Input 
                                        name='ip'
                                        type='text'
                                        required
                                        placeholder='Ip Adress'
                                        onchange={(event) => setIp(event.target.value)}
                                        value={ip}
                                    />
                                    <Button 
                                        text='Consultar'
                                        type='submit'
                                    />
                                </div>
                                
                            </form>

                            <aside className='w-[30%] max-h-full '>
                                <h2 className='text-[#E1E1E6] mb-3'>Recentes: {recentes.length} </h2>
                                 
                                {consulta[0].hostname == '' ? <span></span> : (
                                    <ul className='text-white flex flex-col gap-1 h-[calc(194px)] overflow-auto'>
                                        {recentes.map((item, index) => (
                                            <div onClick={() => setIp(item)}>
                                                <Box key={index} text={item}/>
                                            </div>
                                        ))}
                                    </ul>)
                                }
                            </aside>
                        </div>
                        
                    </section>

                    <section className="flex flex-col h-[calc(100vh-222px)]">
                        <h1 className={style.titulo}>Conexões</h1>
                        { consulta[0].hostname == '' ? '' : <h4 className='text-[#E1E1E6] mb-3'>Resultados: {consulta.length }</h4> }
                        { consulta[0].hostname == '' ? <span className='text-white text-center text-xs'> </span> : (
                            <ul className='flex flex-col h-max-full overflow-auto w-full gap-1'>
                                < Conexoes consulta={consulta}/>
                            </ul>
                        )}
                        
                    </section>

                    <section className="">
                        <h1 className={style.titulo}>Informações</h1>
                    </section>
                </main>
            </div>
        </>
    )

}