import { Bvh, Environment, OrbitControls, Stars } from "@react-three/drei"
import Asteroids from "./Asteroids"
import { Canvas } from "@react-three/fiber"
import Effects from "./Effects"
import { useControls } from "leva"
import NektoFlareEffect from "./NektoFlareEffect"
function App() {
  const {sunColor} = useControls({
    sunColor: {value: '#80510b', label: 'sunColor'}
  })
  return (
    <>
      <Canvas camera={{ position: [0, 0, 30], fov: 70 }}>
        <color attach="background" args={["#000009"]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, -200]} intensity={50} color={sunColor} />
        <Stars />
        {/* <Bvh>
          <Asteroids />
        </Bvh> */}
        <OrbitControls />
        {/* <Effects /> */}
        <NektoFlareEffect />
      </Canvas>
    </>
  )
}

export default App
