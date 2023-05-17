import logo from '/public/img/logo-poppa.png'
import { Input, Button } from '../components'

export function Login() {
    return ( 
            <section className="flex flex-col w-full m-auto">
                <h1 className="m-auto"><img src={logo} alt="logo" /></h1>
                <h2 className="text-[#E1E1E6] text-center text-3xl font-bold mt-6">Check-Inversion PoP-PA</h2>
                <p className="text-[#7C7C8A] text-center mb-14 mt-2">Faça Login e começe a usar</p>
                <form action="post" className="flex flex-col w-[40%] m-auto">
                    <label htmlFor="usuario" className="text-[#E1E1E6] mb-3">Seu usuário:</label>
                    <Input
                        style={{marginBottom: "16px"}}
                        name="usuario"
                        type="text"
                        placeholder="Usuário"
                    ></Input>
                    <label htmlFor="senha" className="text-[#E1E1E6] mb-3">Sua senha:</label>
                    <Input
                        style={{marginBottom: "16px"}}
                        name="senha"
                        type="password"
                        placeholder="Senha"
                    ></Input>
                    <a href="" className="text-[#7C7C8A] underline">Esqueçeu sua senha?</a>
                    <Button 
                        type="submit"
                        text="Acessar"
                        style={{marginTop: "16px"}}
                    />
                </form>
                <p className="text-[#7C7C8A] text-center mt-4">Ou</p>
                <a href="" className="text-[#7C7C8A] underline text-center mt-4">Criar conta</a>
            </section>
    );
}
