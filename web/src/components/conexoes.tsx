import { Query } from '../types/Query'

interface IConexoes {
  query: Query
  click: Function
  title?: string | undefined
}

export function Conexoes({ query, click, title }: IConexoes): JSX.Element {
  function sendInformation(i: number) {
    click(i)
  }

  return (
    <div className="flex flex-col gap-1 rounded w-full" title={title}>
      {query.map((item, index) => (
        <li className="flex h-min-[0px]" key={index} onClick={() => sendInformation(index)}>
          <span className="bg-[#1E1E1E] text-white w-[50px] font-bold box-border flex items-center justify-center">{index + 1}</span>

          <div className="bg-[#11346B] hover:brightness-150 cursor-pointer grid grid-cols-conexao grid-rows-1 gap-6 px-6 py-2 h-full w-full text-white items-center justify-between">
            <ul className="flex gap-3 flex-grow">
              <li className="flex flex-col">
                <h5 className="text-xs text-[#B9B9B9]">Nome:</h5>
                <p>{item.hostname}</p>
              </li>
              <li className="flex flex-col">
                <h5 className="text-xs text-[#B9B9B9]">Port:</h5>
                <p>{item.port}</p>
              </li>
            </ul>

            <hr className="w-full" />

            <ul className="flex gap-3 flex-grow">
              <li className="flex flex-col">
                <h5 className="text-xs text-[#B9B9B9]">Nome:</h5>
                <p>{item.neighbor}</p>
              </li>
              <li className="flex flex-col">
                <h5 className="text-xs text-[#B9B9B9]">Port:</h5>
                <p>{item.remotePort}</p>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </div>
  )
}
