import { useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { ObjectLoader, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const CoffeeCup = () => {
  const gltf = useLoader(GLTFLoader, '/objects/CoffeeCupScene/CoffeeCup.glb')
 
  return (
    <>
      <primitive object={gltf.scene} scale={2} />
      {/* <mesh>
        <primitive object={obj} scale={2} />
      </mesh> */}
      {/* <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003.geometry}
          material={materials['Glass']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003_1.geometry}
          material={materials['Glass']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle003_2.geometry}
          material={materials['Coffee']}
        />
      </group> */}
    </>
  )
}
export default CoffeeCup
