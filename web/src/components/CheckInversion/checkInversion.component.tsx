import global from '@styles/style.module.scss'
import { FormEvent, useState } from 'react'

import { api } from '../../hooks/useApi'
import { Query } from '../../types/Query'
import { Box, Button, Input } from '..'

// interface INeighbor {
//   hostname: string
//   ip: string
//   neighbors: [
//     {
//       neighbor: string
//       port: string
//       remotePort: string
//       updatedAt: string
//     }
//   ]
//   updatedAt: string
// }

export const CheckInversion = () => {
  const queryType = [
    {
      hostname: '',
      ip: '',
      neighbor: '',
      port: '',
      remotePort: '',
      erro: ''
    }
  ]

  const [ip, setIp] = useState<string>('')
  const [query, setQuery] = useState<Query>(queryType)
  const [recent, setRecent] = useState<Array<string>>([])

  async function queryHost(event: FormEvent) {
    event.preventDefault()

    setQuery(queryType)

    if (ip.length == 0) return

    await api
      .get('/consultar/', {
        params: {
          ip: ip
        }
      })
      .then((response) =>
        typeof response.data == 'string' ? setQuery((lastQuery) => [...lastQuery, (lastQuery[0].erro = response.data)]) : setQuery(response.data)
      )

    recent.includes(ip) ? '' : setRecent((lastRecent) => [ip, ...lastRecent])
    setIp('')
  }

  // async function clickConnection(info: number) {
  //   /* Função para exibir as informações da conexão */
  // }

  return (
    <main className={`bg-[#1C1C20] px-3 ${global.painel}`}>
      <section className="flex flex-col">
        <h1 className={global.titulo}>Consultar Host</h1>
        <div className="flex justify-between h-[230px]">
          <form className="flex flex-col w-[calc(70%-8px)] h-full gap-1 justify-end" onSubmit={queryHost}>
            <p className="text-gray-400 w-[100%] text-sm">
              Consulte os vizinhos que fazem conexões com o switch e obtenha informações detalhadas sobre os enlaces.
            </p>

            <div className="flex flex-col gap-1">
              <label className="text-[#DADADA] text-sm font-bold mt-2 mb-1" htmlFor="ip">
                Digite o IP do host:
              </label>
              <Input
                autoComplete="off"
                name="ip"
                onchange={(event) => setIp(event.target.value)}
                placeholder="Ip Adress"
                required
                type="text"
                value={ip}
              />
              <Button text="Consultar" type="submit" />
            </div>
          </form>

          <aside className="w-[30%] max-h-full rounded bg-[#2a2a2e] p-2">
            <h2 className="text-[#E1E1E6] mb-3">Recentes: {recent.length} </h2>

            {recent.length <= 0 ? (
              <span />
            ) : (
              <ul className="text-white flex flex-col gap-1 h-[194px] overflow-auto">
                {recent.map((item, index) => (
                  <Box click={() => setIp(item)} key={index} text={item} />
                ))}
              </ul>
            )}
          </aside>
        </div>
      </section>

      {/* Conexões */}
      <section className="flex flex-col pb-3 ">
        <h1 className={global.titulo}>Conexões</h1>
        {ip.length == 0 && query[0].hostname == '' ? (
          <span className="text-center text-gray-300">Digite o Ip e consulte para exibir os resultados</span>
        ) : (
          ''
        )}
        {query[0].erro !== '' && query[0].hostname == '' ? <Box classname="bg-red-800 hover:" text={`ERRO: ${query[0].erro}`} /> : ''}
        {query[0].hostname == '' ? (
          ''
        ) : (
          <>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[#E1E1E6] ">Resultados: {query.length}</h4>
              <div className="flex justify-between gap-2 text-white">
                <span className="px-4 py-1 bg-[#11346B] rounded">Ok</span>
                <span className="px-4 py-1 bg-yellow-600 rounded">Down</span>
                <span className="px-4 py-1 bg-red-700 rounded">Invertido</span>
              </div>
            </div>

            <ul className="flex flex-col h-max-full overflow-auto w-full gap-1">
              {/* <Conexoes click={clickConnection} query={query} title="Aperte para mais informações" /> */}
            </ul>
          </>
        )}
      </section>

      <section>{/* card onde ficará as informações */}</section>
    </main>
  )
}
