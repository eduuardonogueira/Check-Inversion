import logo from '/src/img/logo-poppa-new.png'
import { Input, Button } from '../../components'
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Key, User } from '@phosphor-icons/react';

export const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleLogin = async(event: FormEvent) => {
        event.preventDefault()

        if(username && password) {
            const isLogged = await auth.signin(username, password);

            if(isLogged) {
                navigate('/');
            }else{
                alert("usuário ou senha incorretos")
            }
        }
    }

    console.log("teste")


    return ( 
        <main className="h-screen w-screen absolute flex items-center justify-center">
            <section className='flex flex-col bg-[#202024] gap-8 max-w-[500px] relative p-6 rounded-md w-full'>
                <div className='flex flex-col items-center gap-4 w-full'>
                    <h1 className='w-[250px]'><img src={logo} alt="logo do pop-pa" /></h1>
                    <h2 className='text-3xl font-bold text-[#E1E1E6]'>Check-Inversion PoP-PA</h2>
                    <p className='text-[#7C7C8A] font-medium'>Faça login para acessar o conteúdo</p>
                </div>

                <form 
                    method='post'
                    className="flex flex-col w-full"
                    onSubmit={handleLogin}
                >
                    <label htmlFor="usuario" className="text-[#E1E1E6] mb-3">Seu usuário:</label>
                    <div className='relative w-full'>
                        <Input
                            classname="w-full mb-4 "
                            icon={true}
                            name="usuario"
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onchange={ e => setUsername(e.target.value)}
                        ></Input>
                        <User size={20} className='absolute text-[#c0c0d3] top-4 left-6'/>
                    </div>

                    <label htmlFor="senha" className="text-[#E1E1E6] mb-3">Sua senha:</label>
                    <div className='relative w-full'>
                        <Input
                            classname="w-full mb-4"
                            icon={true}
                            name="senha"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onchange={ e => setPassword(e.target.value)}
                        ></Input>
                        <Key size={20} className='absolute text-[#c0c0d3] top-4 left-6'/>
                    </div>

                    <div className='flex gap-2 text-[#7C7C8A]'>
                        <input type='checkbox'></input>
                        <p>Salvar meu login</p>
                    </div>
                    <Button 
                        type="submit"
                        text="Acessar"
                        style={{marginTop: "16px"}}
                    />
                </form>
            </section>
        </main>
    );
}