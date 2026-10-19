import { useState } from 'react'
import GoldCalculator from './GoldCalculator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
      <GoldCalculator/>
     </div>
    </>
  )
}

export default App
