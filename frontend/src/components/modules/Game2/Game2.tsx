import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CoffeCup from './objects/CoffeeCup/CoffeeCup'
import Loader from './components/Loader'
import styles from './CoffeeCup.module.scss'
import { Camera } from 'three'

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
    }
  })
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Game2 = () => {
  return (
    <div className={styles.root}>
      <Canvas>
        <camera/>  
        <Suspense fallback={<Loader/>}>
          <ambientLight/>
          <pointLight position={[50, 50, 50]} power={50} scale={2}/>
          <CoffeCup />
          <OrbitControls />
        </Suspense>
        {/* <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} /> */}
      </Canvas>
    </div>
  )
}
export default Game2
