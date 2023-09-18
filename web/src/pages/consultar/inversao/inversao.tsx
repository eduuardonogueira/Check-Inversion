import { useState, FormEvent } from "react"
import { Button, Input, Box, Conexoes, Load } from '../../../components'
import { api } from "../../../lib/axios"
import style from './checkInversion.module.scss'
import global from '../../../styles/style.module.scss'

interface IConsulta {
    hostname: string,
    ip: string,
    neighbor: string ,
    port: string,
    remotePort: string,
    erro: string | any
}

interface INeighbor {
    hostname: string,
    ip: string,
    neighbors: [{
      neighbor: string,
      port: string,
      remotePort: string,
      updatedAt: string  
    }],
    updatedAt: string
}

export function CheckInversion() {
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

    async function consultarHost(event: FormEvent){
        event.preventDefault()
        setConsulta(consultaType)

        if(ip.length ==0)
            return

        await api.post('/consultar', { ip }).then(response => (
            typeof(response.data) == 'string' ? setConsulta( consultaAntiga => [...consultaAntiga, consultaAntiga[0].erro = response.data]) : 
            setConsulta(response.data)))
        
        setRecentes( recentesAntigos => [ ip, ...recentesAntigos])
        setInfoRecentes('')
    }

    function clickRecente(info: string) {
        setInfoRecentes(info)
        setIp(info)
    }

    async function clickConexoes(info: number) {
        /* Função para exibir as informações da conexão */
    }

    return (
        <main className={`bg-[#1C1C20] px-3 ${global.painel}`}>
            <section className="flex flex-col">
                <h1 className={global.titulo}>Consultar Host</h1>
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
                                autoComplete="off"
                                onchange={(event) => (setIp(event.target.value), setInfoRecentes(event.target.value))}
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
                <h1 className={global.titulo}>Conexões</h1>
                { ip.length == 0 && consulta[0].hostname == '' ? <span className='text-center text-gray-300'>Digite o Ip e consulte para exibir os resultados</span> : ''}
                { consulta[0].erro !== '' && consulta[0].hostname == '' ? < Box text={`ERRO: ${consulta[0].erro}`} classname='bg-red-800 hover:' /> : '' }
                { consulta[0].hostname == '' ? '' : (
                    <>
                        <div className='flex justify-between items-center mb-3'>
                        <h4 className='text-[#E1E1E6] '>Resultados: {consulta.length }</h4> 
                        <div className='flex justify-between gap-2 text-white'>
                            <span className='px-4 py-1 bg-[#11346B] rounded'>Ok</span>
                            <span className="px-4 py-1 bg-yellow-600 rounded">Down</span>
                            <span className="px-4 py-1 bg-red-700 rounded">Invertido</span>
                        </div>
                        </div>

                        <ul className='flex flex-col h-max-full overflow-auto w-full gap-1'>
                            < Conexoes 
                                consulta={consulta} 
                                click={clickConexoes}
                                title={'Aperte para mais informações'}    
                            />
                        </ul>
                    </>
                    
                )}
                
            </section>

            <section>
                {/* card onde ficará as informações */}
            </section>

        </main>
    )
}