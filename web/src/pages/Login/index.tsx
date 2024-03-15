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
                alert("Usuário ou Senha Incorretos");
                setPassword('');
                setUsername('');
            }
        } else {
            alert("Por favor, preencha todos os campos!")
            setPassword('');
            setUsername('');
        }
    }

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
                    <label htmlFor="usuario" className="flex flex-col gap-2 text-[#E1E1E6] mb-3 relative">
                        <span className='font-medium'>Seu usuário:</span>
                        
                        <Input
                            classname="w-full mb-4"
                            icon={true}
                            name="usuario"
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onchange={ e => setUsername(e.target.value)}
                        />
                        <User size={20} className='absolute text-[#c0c0d3] top-12 left-6'/>
                    </label>

                    <label htmlFor="senha" className="flex flex-col gap-2 text-[#E1E1E6] mb-3 relative w-full">
                        <span className='font-medium'>Sua senha:</span>

                        <Input
                            classname="w-full"
                            icon={true}
                            name="senha"
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onchange={ e => setPassword(e.target.value)}
                        />
                        <Key size={20} className='absolute text-[#c0c0d3] top-12 left-6'/>
                    </label>

                    <label className='flex gap-2 text-[#7C7C8A] my-3'>
                        <input type='checkbox' className="checked:"></input>
                        <span>Salvar meu login</span>
                    </label>

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