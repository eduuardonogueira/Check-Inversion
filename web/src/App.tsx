import './styles/global.css'

import Habit from "./components/habits"

function App() {

  return (
    <div>
      <Habit propriedade={10}/>
      <Habit propriedade={20}/>
      <Habit propriedade={30}/>
      <Habit propriedade={40}/>
      <Habit propriedade={50}/>
    </div>
  )
}

export default App
