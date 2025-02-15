/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/mailbox.glb 
*/

import React, { useRef, useState, useEffect } from 'react'
import { ContactShadows, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three'

export function Mailbox(props) {
  const { nodes, materials } = useGLTF('./models/mailbox.glb')
  const [open, setOpen] = useState(false);

  const [{ rotation }, setDoor] = useSpring(() => ({
    rotation: [0, 0, 0]
  }))

  useEffect(() => {
    if (!props.focusMailbox && open) {
      onClick(null)
    }

  }, [props])

  const onClick = (event) => {
    event?.stopPropagation();
    setOpen((prev) => {
      if (prev == false) {
        setDoor.start({
          from: {
            rotation: [0, 0, 0]
          },
          to: {
            rotation: [2, 0, 0]
          }
        })
      } else {
        setDoor.start({
          from: {
            rotation: [2, 0, 0]
          },
          to: {
            rotation: [0, 0, 0]
          }
        })
      }
      return !prev
    })
  }

  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube001.geometry} material={materials['Material.001']} position={[0, 7.101, 0]} scale={[1.717, 1.717, 3.74]} />
      <animated.mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Cube002.geometry} 
        material={materials['Material.001']} 
        position={[0, 5.465, 3.735]} 
        scale={[1.636, 1.636, 3.564]} 
        rotation={rotation}
        onClick={(event) => onClick(event)}
      />
      <mesh castShadow receiveShadow geometry={nodes.Cylinder.geometry} material={materials['Material.001']} position={[0, 5.465, 3.735]} rotation={[0, 0, -Math.PI / 2]} scale={[0.071, 1.479, 0.071]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials['Material.002']} position={[1.773, 7.092, 1.554]} rotation={[-Math.PI / 1.8, 0, 0]} scale={[-0.047, -1.247, -0.116]} />
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials['Material.003']} position={[0, 1.684, 0]} scale={[0.324, 3.792, 0.324]} />
    </group>
  )
}

useGLTF.preload('./models/mailbox.glb')
