/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/empty_island.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Island(props) {
  const { nodes, materials } = useGLTF('./models/empty_island.glb')

  return (
    <group {...props} dispose={null}>
      <group position={[0.228, 3.963, -5.203]} rotation={[-Math.PI / 2, 0, -0.96]} scale={[0.019, 0.019, 0.251]}>
        <mesh castShadow receiveShadow geometry={nodes['Tree2_02_-_Default_0'].geometry} material={materials['02_-_Default']} />
        <mesh castShadow receiveShadow geometry={nodes['Tree2_03_-_Default_0'].geometry} material={materials['03_-_Default']} />
      </group>
      <group position={[4.813, 3.656, -1.062]} rotation={[-Math.PI / 2, 0, -Math.PI / 9]} scale={[0.019, 0.019, 0.29]}>
        <group position={[27.99, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes['Tree3_02_-_Default_0'].geometry} material={materials['02_-_Default']} />
          <mesh castShadow receiveShadow geometry={nodes['Tree3_03_-_Default_0'].geometry} material={materials['03_-_Default']} />
        </group>
      </group>
      <group position={[-0.713, 2.7, -0.228]} rotation={[-Math.PI / 2, 0, 0]} scale={0.135}>
        <mesh castShadow receiveShadow geometry={nodes['New_Water_04_-_Default_0'].geometry} material={materials['04_-_Default']} scale={2.634} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes['Island_01_-_Default_0'].geometry} material={materials['01_-_Default']} position={[0.059, -2.131, -0.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.119} />
      <mesh castShadow receiveShadow geometry={nodes['CoCoNut001_05_-_Default_0'].geometry} material={materials['05_-_Default']} position={[0.599, 4.284, -4.933]} rotation={[-Math.PI / 2, 0, 0]} scale={0.046} />
      <mesh castShadow receiveShadow geometry={nodes['CoCoNut002_05_-_Default_0'].geometry} material={materials['05_-_Default']} position={[1.051, 4.314, -5.185]} rotation={[-Math.PI / 2, 0, 0]} scale={0.046} />
      <mesh castShadow receiveShadow geometry={nodes['CoCoNut003_05_-_Default_0'].geometry} material={materials['05_-_Default']} position={[4.55, 3.994, -0.586]} rotation={[-Math.PI / 2, 0, 0]} scale={0.046} />
    </group>
  )
}

useGLTF.preload('./models/empty_island.glb')
