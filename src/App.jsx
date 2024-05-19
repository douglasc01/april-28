import { Canvas } from '@react-three/fiber'
import './App.css'
import { Playground } from './components/Playground'
function App() {


  return (
    <Canvas camera={{ position: [10, 10, 10]}}>
      <Playground />
    </Canvas>
  )
}

export default App
