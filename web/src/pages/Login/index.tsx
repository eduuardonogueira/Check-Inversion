import logo from '/src/img/logo-poppa-new.png'
import { Input, Button } from '../../components'
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

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


    return ( 
        <main className="absolute h-full flex items-center w-full">
            <section className='relative top flex flex-col w-full'>
                <div className='flex flex-col gap-3'>
                    <h1 className="m-auto w-[25%]">
                        <img src={logo} alt="logo"/>
                    </h1>
                    <h2 className="text-[#E1E1E6] text-center text-3xl font-bold mt-6">Check-Inversion PoP-PA</h2>
                    <p className="text-[#7C7C8A] text-lg text-center mb-14 mt-2">Faça Login</p>
                </div>
                <form 
                    method='post'
                    className="flex flex-col w-[40%] m-auto"
                    onSubmit={handleLogin}
                >
                    <label htmlFor="usuario" className="text-[#E1E1E6] mb-3">Seu usuário:</label>
                    <Input
                        style={{marginBottom: "16px"}}
                        name="usuario"
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onchange={ e => setUsername(e.target.value)}
                    ></Input>
                    <label htmlFor="senha" className="text-[#E1E1E6] mb-3">Sua senha:</label>
                    <Input
                        style={{marginBottom: "16px"}}
                        name="senha"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onchange={ e => setPassword(e.target.value)}
                    ></Input>
                    <a href="" className="text-[#7C7C8A] underline">Esqueceu sua senha?</a>
                    <Button 
                        type="submit"
                        text="Acessar"
                        style={{marginTop: "16px"}}
                    />
                </form>
                <p className="text-[#7C7C8A] text-center mt-4">Ou</p>
                <a href="" className="text-[#7C7C8A] underline text-center mt-4">Criar conta</a>
            </section>
        </main>
    );
}