import { useState } from 'react'

interface Objeto {
  name: string
  icon: JSX.Element
  get?: string | JSX.Element
}

interface IMenuLateral {
  title: string
  list: Objeto[]
  changeList?: (get: string | any) => void | undefined
}

export function MenuLateral({ title, list, changeList }: IMenuLateral): JSX.Element {
  function setList(list: string | any) {
    changeList !== undefined && changeList(list)
  }

  const [active, setActive] = useState<string[]>(() => {
    const array = []
    for (let i = 0; i < list.length; i++) {
      i == 0 ? array.push('#044FBF') : array.push('transparent')
    }
    return array
  })

  const clickMenu = (index: number): void => {
    var newActive = [...active]

    newActive[index] == 'transparent' && (newActive.fill('transparent'), (newActive[index] = '#044FBF'))

    setActive(newActive)
  }

  return (
    <nav className="flex flex-col bg-[#1C1C20] w-[148px] gap-8 h-[calc(100vh-156px)] p-3">
      <h1 className="text-white w-full p-1 bg-[#121214] text-base font-bold text-center">{title}</h1>
      <ul className="flex flex-col w-full gap-2">
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-start gap-1 p-1 w-full text-white font-bold hover:bg-[#044FBF] hover:cursor-pointer"
            onClick={() => (clickMenu(index), item.get !== undefined && setList(item.get))}
            style={{ backgroundColor: active[index] } as any}
          >
            {item.icon}
            <p className="w-auto">{item.name}</p>
          </li>
        ))}
      </ul>
    </nav>
  )
}
