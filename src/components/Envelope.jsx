/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/letter.glb -s 
*/

import React, { useMemo, useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { CameraWrapper, ControlsWrapper } from './Wrappers'

export function Envelope(props) {
  const { nodes, materials } = useGLTF('./models/envelope.glb')
  const { focus, open, setOpen } = props;

  useEffect(() => {
    if (!focus && open) {
      onClick(null);
    } 
  }, [props])

  const [{ rotation }, setFlap] = useSpring(() => ({
    rotation: [0, 0, 0]
  }))

  const onClick = (event) => {
    event?.stopPropagation();
    if (focus || !focus && open) {
      setOpen((prev) => {
        if (prev == false) {
          setFlap.start({
            from: {
              rotation: [0, 0, 0]
            },
            to: {
              rotation: [0, 0, Math.PI * 1.1]
            }
          })
        } else {
          setFlap.start({
            from: {
              rotation: [0, 0, Math.PI * 1.1]
            },
            to: {
              rotation: [0, 0, 0]
            },
            delay: 200
          })
        }
        return !prev
      })
    }
  }

  return (
    <group
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.001']}
        scale={[1.2, 1, 2]}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials['Material.001']}
        position={[-1.171, 0.001, 0]}
        scale={[1.2, 1, 2]}
        rotation={rotation}
        onClick={(event) => onClick(event)}
      />
    </group>
  )
}

useGLTF.preload('./models/envelope.glb')
