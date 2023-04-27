import style from '../styles/global.css'

export default function Teste() {
    return (
        <main className='h-80 w-80 text-2xl m-auto bg-red-500 flex flex-col justify-around items-center'>
            <h1 className='text-center font-bold f'>Consultar Host</h1>
            <form action="./consulta"  className=' h-24 flex flex-col justify-around items-center'>
                <label className='text-center'> Digite o Ip para consultar as informações do Host</label>
                <input type="text" placeholder='Digite o ip'/>
                <input type='submit' className='bg-blue-700 w-48 '/>
            </form>
        </main>
    )
}