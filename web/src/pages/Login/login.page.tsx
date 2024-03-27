import { Logo } from '@assets/img'
import { Button, Input } from '@components/index'
import { Key, User } from '@phosphor-icons/react'
import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/Auth/AuthContext'

export const Login = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    if (username && password) {
      const isLogged = await auth.signin(username, password)

      if (isLogged) {
        navigate('/')
      } else {
        alert('Usuário ou Senha Incorretos')
        setPassword('')
        setUsername('')
      }
    } else {
      alert('Por favor, preencha todos os campos!')
      setPassword('')
      setUsername('')
    }
  }

  return (
    <main className="h-screen w-screen absolute flex items-center justify-center">
      <section className="flex flex-col bg-[#202024] gap-8 max-w-[500px] relative p-6 rounded-md w-full">
        <hgroup className="flex flex-col items-center gap-4 w-full">
          <h1 className="w-[250px]">
            <img alt="logo do pop-pa" src={Logo} />
          </h1>
          <h2 className="text-3xl font-bold text-[#E1E1E6]">Check-Inversion PoP-PA</h2>
          <p className="text-[#7C7C8A] font-medium">Faça login para acessar o conteúdo</p>
        </hgroup>

        <form className="flex flex-col w-full" method="post" onSubmit={handleLogin}>
          <label className="flex flex-col gap-2 text-[#E1E1E6] mb-3 relative" htmlFor="usuario">
            <span className="font-medium">Seu usuário:</span>

            <Input
              classname="w-full mb-4"
              icon
              name="usuario"
              onchange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              type="text"
              value={username}
            />
            <User className="absolute text-[#c0c0d3] top-12 left-6" size={20} />
          </label>

          <label className="flex flex-col gap-2 text-[#E1E1E6] mb-3 relative w-full" htmlFor="senha">
            <span className="font-medium">Sua senha:</span>

            <Input
              classname="w-full"
              icon
              name="senha"
              onchange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              type="password"
              value={password}
            />
            <Key className="absolute text-[#c0c0d3] top-12 left-6" size={20} />
          </label>

          <label className="flex gap-2 text-[#7C7C8A] my-3">
            <input className="checked:" type="checkbox" />
            <span>Salvar meu login</span>
          </label>

          <Button style={{ marginTop: '16px' }} text="Acessar" type="submit" />
        </form>
      </section>
    </main>
  )
}
