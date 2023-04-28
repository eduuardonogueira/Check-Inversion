import { FormEvent, useEffect, useState } from 'react'
import style from '../styles/global.css'
import { api } from '../lib/axios'

export default function Teste() {
    const [ ip, setIp ] = useState('')
    const [ resposta, setResposta ] = useState([])
    
    async function createConsult(event: FormEvent) {
        event.preventDefault()

        if (ip.length == 0){
            return
        }

        await api.post('consult', {
            ip
        }).then(response => (
            console.log(response.data)
        )).then(response => (
            setResposta(response.data)
        ))

    }
    
    
    return (
        <main className='h-80 w-80 text-2xl m-auto bg-red-500 flex flex-col justify-around items-center'>
            <h1 className='text-center font-bold f'>Consultar Host</h1>
            <form onSubmit={createConsult} className=' h-24 flex flex-col justify-around items-center'>
                <label className='text-center'> Digite o Ip para consultar as informações do Host</label>
                <input 
                    name='ip'
                    type="text" 
                    placeholder='Digite o ip'
                    onChange={event => setIp(event.target.value)}    
                />
                <input type='submit' className='bg-blue-700 w-48 '/>
            </form>
        </main>
    )
}