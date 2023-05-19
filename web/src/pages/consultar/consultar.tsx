import { FormEvent, useState } from 'react'
import { api } from '../../lib/axios'
import { Menu, MenuLateral, Painel, Button, Input, Box, Conexoes, Load } from '../../components'
import { Swap, WarningCircle } from '@phosphor-icons/react'
import style from './style.module.scss'

interface IConsulta {
    hostname: string,
    ip: string,
    neighbor: string,
    port: string,
    remotePort: string,
    erro: string | any
}

export function Consultar() {
    const consultaType = [{
        hostname: '',
        ip: '',
        neighbor: '',
        port: '',
        remotePort: '',
        erro: ''
    }]

    const [ ip, setIp ] = useState<string>('')
    const [ consulta, setConsulta ] = useState<IConsulta[]>(consultaType)
    const [ recentes, setRecentes ] = useState(Array<string>)
    const [ infoRecentes, setInfoRecentes ] = useState<string>()
    const [ infoConexoes, setInfoConexoes ] = useState<number>(0)
    const [ informacoes, setInformacoes ] = useState(false)

    async function consultarHost(event: FormEvent){
        event.preventDefault()
        setConsulta(consultaType)

        if(ip.length ==0)
            return

        await api.post('consultar', { ip }).then(response => (
            typeof(response.data) == 'string' ? setConsulta( consultaAntiga => [...consultaAntiga, consultaAntiga[0].erro = response.data]) : 
            setConsulta(response.data)))
        
        setRecentes( recentesAntigos => [ ip, ...recentesAntigos])
        setInfoRecentes('')
    }

    function clickRecente(info: string) {
        setInfoRecentes(info)
        setIp(info)
    }

    function clickConexoes(info: number) {
        setInfoConexoes(info)
        setInformacoes(true)
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
                            <form onSubmit={consultarHost} className='flex flex-col w-[calc(70%-8px)] h-full gap-1 justify-end'>
                                <p className='text-gray-400 w-[100%] text-sm'>Consulte os vizinhos que fazem conexões com o switch e obtenha informações detalhadas sobre os enlaces.</p>
                                
                                <div className='flex flex-col gap-1'>
                                <label htmlFor="ip" className='text-[#DADADA] text-sm font-bold mt-2 mb-1'>Digite o IP do host:</label>
                                    <Input 
                                        name='ip'
                                        type='text'
                                        required
                                        placeholder='Ip Adress'
                                        onchange={(event) => (setIp(event.target.value), setInfoRecentes(event.target.value), setInformacoes(false))}
                                        value={infoRecentes}
                                    />
                                    <Button 
                                        text='Consultar'
                                        type='submit'
                                    />
                                </div>
                                
                            </form>

                            <aside className='w-[30%] max-h-full rounded bg-[#2a2a2e] p-2'>
                                <h2 className='text-[#E1E1E6] mb-3'>Recentes: {recentes.length} </h2>
                                 
                                {recentes.length <= 0 ? <span></span> : (
                                    <ul className='text-white flex flex-col gap-1 h-[194px] overflow-auto'>
                                        {recentes.map((item, index) => (
                                            <Box key={index} text={item} click={clickRecente} />
                                        ))}
                                    </ul>)
                                }
                            </aside>
                        </div>
                        
                    </section>
                    
                    {/* Conexões */}
                    <section className="flex flex-col pb-3 ">
                        <h1 className={style.titulo}>Conexões</h1>
                        { ip.length == 0 && consulta[0].hostname == '' ? <span className='text-center text-gray-300'>Digite o Ip e consulte para exibir os resultados</span> : ''}
                        { consulta[0].erro !== '' && consulta[0].hostname == '' ? < Box text={`ERRO: ${consulta[0].erro}`} classname='bg-red-800 hover:' /> : '' }
                        { consulta[0].hostname == '' ? '' : (
                            <>
                                <div className='flex justify-between items-center mb-3'>
                                <h4 className='text-[#E1E1E6] '>Resultados: {consulta.length }</h4> 
                                <div className='flex justify-between gap-2 text-white'>
                                    <span className='px-4 py-1 bg-[#11346B] rounded'>Fibra</span>
                                    <span className="px-4 py-1 bg-yellow-600 rounded">Metálico</span>
                                    <span className="px-4 py-1 bg-red-700 rounded">Down</span>
                                </div>
                                </div>

                                <ul className='flex flex-col h-max-full overflow-auto w-full gap-1'>
                                    < Conexoes consulta={consulta} click={clickConexoes}/>
                                </ul>
                            </>
                            
                        )}
                        
                    </section>

                    <section className="">
                        <h1 className={style.titulo}>Informações</h1>
                            { !informacoes ? '' : (
                                <>
                                    <article>
                                        <h2 className={style.subTitulo}>Consulta</h2>
                                        <ul className='flex justify-between gap-1'>
                                        <Box classname='w-[50%]' text={consulta[infoConexoes].hostname}/>
                                        <Box classname='w-[50%]' text={consulta[infoConexoes].neighbor}/>
                                        </ul>
                                        <div className='flex justify-between gap-1 mt-1'>
                                            <ul className='flex flex-col gap-2 w-[50%] text-gray-100'>
                                                <li>Ip: {consulta[infoConexoes].ip}</li>
                                                <li>Porta: {consulta[infoConexoes].port}</li>
                                            </ul>
                                            <ul className='flex flex-col gap-2 w-[50%] text-gray-100'>
                                                <li>Ip: Não disponível</li>
                                                <li>Porta: {consulta[infoConexoes].remotePort}</li>
                                            </ul>
                                        </div>
                                    </article>

                                    <article>
                                        <h2 className={`mt-4 ${style.subTitulo}`}>Banco de Dados</h2>
                                        <Box text="Não disponível" classname='bg-red-900'/>
                                        {/* <ul className='flex justify-between gap-1'>
                                            <Box classname='w-[50%]' text={consulta[infoConexoes].hostname}/>
                                            <Box classname='w-[50%]' text={consulta[infoConexoes].neighbor}/>
                                        </ul>
                                        <div className='flex justify-between gap-1 mt-1'>
                                            <ul className='flex flex-col gap-2 w-[50%] text-gray-100'>
                                                <li>Ip: {consulta[infoConexoes].ip}</li>
                                                <li>Porta: {consulta[infoConexoes].port}</li>
                                            </ul>
                                            <ul className='flex flex-col gap-2 w-[50%] text-gray-100'>
                                                <li>Ip: {consulta[infoConexoes].ip}</li>
                                                <li>Porta: {consulta[infoConexoes].remotePort}</li>
                                            </ul>
                                        </div> */}
                                    </article>
                                </>
                            )}
                    </section>
                </main>
            </div>
        </>
    )

}