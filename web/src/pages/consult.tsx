import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'
import { Menu, Button } from '../components'

const valor = [
    {
        hostname: '',
        ip: '',
        neighbor: '',
        port: '',
        remotePort: ''
    }
]

export function Consult() {
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
        <>
            < Menu ativo="servicos"/>
            <main className='h-[calc(100vh-100px)] flex flex-col gap-3'>
                <form 
                    onSubmit={createConsult} 
                    className='flex flex-col w-3/4 m-auto px-24 py-12 rounded-md bg-[#1C1C20]'>
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
                    <Button 
                        type="submit"
                        text='Consultar'
                    />
                </form>

                {consulta[0].hostname == '' ?
                    <span></span> :
                    <section className='flex flex-col w-3/4 m-auto bg-[#1C1C20] p-6'>  
                        <h2 className='text-white text-2xl mb-6'> Resultado: {consulta.length}</h2>
                    
                        <article className='flex w-full flex-wrap justify-center gap-y-6'>
                            {consulta.map((item, index) => (
                                <>
                                    <span className='h-1 bg-green-500 w-[19vw] flex self-center'></span>
                                </>
                            ))}
                        </article>
                    </section>
                }
            </main>
        </>
    )
}