import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import your Plot component
import Plot from './Plot.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Plot />
    </>
  )
}

export default App
