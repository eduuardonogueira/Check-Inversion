import { Box, Button, Connections, Input } from '@components/index'
import { ArrowLeft } from '@phosphor-icons/react'
import global from '@styles/style.module.scss'
import { FormEvent, useState } from 'react'

import { api } from '../../hooks/useApi'

export const CheckHost = () => {
  const consultaType = [
    {
      hostname: '',
      ip: '',
      neighbor: '',
      port: '',
      remotePort: '',
      erro: ''
    }
  ]

  const [verificar, setVerificar] = useState(consultaType)
  const [ip, setIp] = useState<string>('')
  const [registrado, setRegistrado] = useState('')

  async function verificarConexoes(event: FormEvent) {
    event.preventDefault()
    setVerificar(consultaType)

    if (ip.length == 0) return

    await api
      .get('/consultar/', {
        params: {
          ip
        }
      })
      .then((response) =>
        typeof response.data == 'string'
          ? setVerificar((consultaAntiga) => [...consultaAntiga, (consultaAntiga[0].erro = response.data)])
          : setVerificar(response.data)
      )
  }

  async function registrar() {
    await api.post('/registrar', { ip }).then((response) => setRegistrado(response.data))
  }

  return (
    <main className="flex h-full w-full bg-[#1C1C20]">
      {verificar[0].hostname === '' ? (
        <section className=" flex w-3/2 flex-col self-center m-auto bg-[#1F1E1F] ">
          <h1 className={global.titulo}>Verificar Conexões</h1>
          <form className="flex flex-col gap-3 px-8 py-6" onSubmit={verificarConexoes}>
            <p className="text-[#E0E0E0]">Consulte o switch para verificar suas conexões antes de adicioná-lo no monitoramento.</p>
            <label className="text-[#DADADA] bold" htmlFor="">
              Digite o Ip do host:
            </label>
            <div className="flex flex-col w-full gap-1">
              <Input name="ip" onchange={(event) => setIp(event.target.value)} placeholder="Ip Address" type="text" />
              <Button text="Verificar" />
            </div>
          </form>
        </section>
      ) : (
        <article className="flex w-full justify-between mx-3">
          <button
            className="flex gap-2 items-center h-12 p-2 rounded text-white bg-[#044FBF]"
            onClick={() => (setVerificar(consultaType), setRegistrado(''), setIp(''))}
            type="button"
          >
            <ArrowLeft /> Voltar
          </button>

          <section className="flex flex-col w-[90%] gap-10">
            <Connections query={verificar} />

            <Button onClick={registrar} text="Registrar" />

            {registrado !== '' ? <Box classname="list-none" text={registrado} /> : null}
          </section>
        </article>
      )}
    </main>
  )
}
