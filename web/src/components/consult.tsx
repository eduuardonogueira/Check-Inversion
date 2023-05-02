import { FormEvent, useEffect, useState } from 'react'
import style from '../styles/global.css'
import { api } from '../lib/axios'

interface IResposta {
    hostname: string,
    ip: string,
    neighbor: string,
    port: string,
    remotePort: string
}

const valor = [
    {
        hostname: '',
        ip: '',
        neighbor: '',
        port: '',
        remotePort: ''
    }
]

export default function Teste() {
    const [ ip, setIp ] = useState('')
    const [ consulta, setConsulta ] = useState(valor)
    
    async function createConsult(event: FormEvent) {
        event.preventDefault()

        if (ip.length == 0){
            return
        }

        await api.post('consult', {
            ip
        }).then(response => (
            setConsulta(response.data)
        ))
    }
    
    
    return (
        <main className='h-screen flex flex-col gap-3 '>

            <form 
                onSubmit={createConsult} 
                className='flex flex-col w-3/4 m-auto px-24 py-12 rounded-md bg-[#16161A]'>
                <h1 className='font-bold text-[#9E9EACE1E1E6] text-3xl text-center mb-2 text-white'>Consultar Host</h1>
                <p className='text-[#9E9EAC] w-56 m-auto text-base mb-10'>
                    Consulte os vizinhos que fazem 
                    parte do switch separadamente
                </p>
                <label className='text-[#E1E1E6]'> Digite o Ip do Host</label>
                <input 
                    className='bg-[#343440] text-[#7C7C8A] rounded-sm w-full px-6 py-4 mt-3 mb-4'
                    name='ip'
                    type="text" 
                    placeholder='Ip Address'
                    onChange={event => setIp(event.target.value)}    
                />
                <input 
                    type='submit'
                    className='bg-blue-700 w-full px-6 py-4 rounded-sm text-cyan-50'
                    value={'Consultar'}
                />
            </form>

            {consulta[0].hostname == '' ?
                <span></span> :
                <section className='flex flex-col w-3/4 m-auto'>  
                    <h2 className='text-white text-2xl '> Resultado: </h2>
                
                    <article className='flex w-full flex-wrap justify-start'>
                        {consulta.map((item, index) => (
                            <ul key={index} className='flex flex-col p-6 m-1 w-[31%] box-border bg-[#044FBF] rounded-md justify-around'>
                                <li className='text-slate-300 flex justify-between'> 
                                    Consulta: <p className='text-white'>{index}</p> 
                                </li> 
                                <li className='text-slate-300 flex justify-between'> 
                                    Host: <p className='text-white'>{item.hostname}</p> 
                                </li> 
                                <li className='text-slate-300 flex justify-between'> 
                                    Ip: <p className='text-white'>{item.ip}</p> 
                                </li> 
                                <li className='text-slate-300 flex justify-between'> 
                                    Porta: <p className='text-white'>{item.port}</p> 
                                </li> 
                                <li className='text-slate-300 flex justify-between'> 
                                    Vizinho: <p className='text-white'>{item.neighbor}</p>
                                </li>
                                <li className='text-slate-300 flex justify-between'> 
                                    Porta Remota: <p className='text-white'>{item.remotePort}</p>
                                </li>
                            </ul>
                        ))}
                    </article>
                </section>
                
            }

           
                 
        </main>
    )
}