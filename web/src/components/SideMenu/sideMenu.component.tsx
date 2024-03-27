import { useState } from 'react'

interface IMenuLateral {
  title: string
  list: {
    name: string
    icon: JSX.Element
    get?: string | JSX.Element
  }[]
  changeList?: (get: string | JSX.Element) => void
}

export const SideMenu = ({ title, list, changeList }: IMenuLateral): JSX.Element => {
  function setList(get: string | JSX.Element) {
    changeList ? changeList(get) : ''
  }

  const [active, setActive] = useState<string[]>(() => {
    const array = []
    for (let i = 0; i < list.length; i++) {
      i == 0 ? array.push('#044FBF') : array.push('transparent')
    }
    return array
  })

  const clickMenu = (index: number): void => {
    const newActive = [...active]

    newActive[index] == 'transparent' && (newActive.fill('transparent'), (newActive[index] = '#044FBF'))

    setActive(newActive)
  }

  return (
    <nav className="flex flex-col bg-[#1C1C20] w-[148px] gap-8 h-[calc(100vh-156px)] p-3">
      <h1 className="text-white w-full p-1 bg-[#121214] text-base font-bold text-center">{title}</h1>
      <ul className="flex flex-col w-full gap-2">
        {list.map((item, index) => (
          <li
            className="flex items-center justify-start gap-1 p-1 w-full text-white font-bold hover:bg-[#044FBF] hover:cursor-pointer"
            key={index}
            onClick={() => (clickMenu(index), item.get !== undefined && setList(item.get))}
            style={{ backgroundColor: active[index] }}
          >
            {item.icon}
            <p className="w-auto">{item.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  )
}
