import { OrbitControls, useHelper } from "@react-three/drei"
import { Island } from "./Island"
import { Mailbox } from "./Mailbox"
import { Envelope } from "./Envelope"
import { FoldablePaper } from "./FoldablePaper"
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpring } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { animated, config } from "@react-spring/three";
import { CameraWrapper, ControlsWrapper } from "./Wrappers";
import * as THREE from 'three';

export const Playground = () => {
    // const dirLight = useRef<DirectionalLight>(null);
    // useHelper(dirLight, DirectionalLightHelper, 1, "red");
    const { camera, controls } = useThree();
    const AnimateCamera = useMemo(() => animated(CameraWrapper), []);
    const AnimateControls = useMemo(() => animated(ControlsWrapper), []);
    const playground = useRef();
    const mailbox = useRef();
    const envelope = useRef();
    const letter = useRef();
    const mailboxIsHovered = useRef(false);
    const envelopeIsHovered = useRef(false);
    const startingRotation = -0.3
    const [focusMailbox, setFocusMailbox] = useState(false);
    const [focusEnvelope, setFocusEnvelope] = useState(false);
    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [openLetter, setOpenLetter] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [panSpeed, setPanSpeed] = useState(1);

    const defaultVectors = {
        mailboxPosition: [0, 3.6, 2.5],
        mailboxFocusPosition: [0, 3.5, 2.3],
        selectionPosition: [0, 4, 2.5],
        selectionFocusPosition: [0, 5, 2.3],
        cameraDefaultPosition: [10, 10, 10],
        targetDefaultPosition: [0, 3, 0],
        envelopeDefaultPosition: [-0.25, 1.3, 0],
        envelopeDefaultRotation: [-0.02 * Math.PI, 0, -1],
        letterDefaultPosition: [0, 0.005, 0],
        letterDefaultRotation: [0, 0, 0],
    }

    // mailbox hover, click area and focus settings
    const mailboxSprings = useSpring(
        { 
            scale: focusMailbox ? 2 : 1, 
            selectionScale: focusMailbox ? 4 : 1,
            position: focusMailbox ? [0, 3.5, 2.3] : [0, 3.6, 2.5],
            selectionPosition: focusMailbox ? [0, 5, 2.3] : [0, 4, 2.5],
            config: config.wobbly 
        }
    );

    // setup springs
    const [{ 
        cameraPosition,
        targetPosition,
        islandRotation,
        envelopePosition,
        envelopeRotation,
        letterPosition,
        letterRotation,
        onStart,
        onRest,
    }, setSpring] = useSpring(() => ({
        cameraPosition: defaultVectors.cameraDefaultPosition,
        targetPosition: defaultVectors.targetDefaultPosition,
        envelopeRotation: defaultVectors.envelopeDefaultRotation,
        envelopePosition: defaultVectors.envelopeDefaultPosition,
        letterPosition: defaultVectors.letterDefaultPosition,
        letterRotation: defaultVectors.letterDefaultRotation,
        islandRotation: [0, 0, 0]
    }))

    

    const onMailboxClick = (event, focus) => {
        event.stopPropagation();
        setFocusMailbox((prev) => {
            if ((prev == false) && (prev != focus)) {
                setSpring.start({
                    from: {
                        cameraPosition: camera.position.toArray(),
                        targetPosition: controls.target.toArray(),
                    },
                    to: {
                        cameraPosition: [4, 8, 6],
                        targetPosition: [0, 5, 2.3],
                    }
                })
            } else if ((prev == true) && (prev != focus)) {
                setSpring.start({
                    from: {
                        cameraPosition: camera.position.toArray(),
                        targetPosition: controls.target.toArray(),
                    },
                    to: {
                        cameraPosition: defaultVectors.cameraDefaultPosition,
                        targetPosition: defaultVectors.targetDefaultPosition,
                    }
                })
            };
            return focus;
        });
    }

    const onEnvelopeClick = (event) => {
        event.stopPropagation();
        if (!animating) {
            setFocusEnvelope((prev) => {
                if (prev == false) {
                    setSpring.start({
                        from: {
                            envelopePosition: envelope.current.position.toArray(),
                            envelopeRotation: envelope.current.rotation.toArray().slice(0, 3),
                            cameraPosition: camera.position.toArray(),
                            targetPosition: controls.target.toArray(),
                        },
                        to: {
                            envelopePosition: [0.2, 1.6, 1.5],
                            envelopeRotation: [0, -Math.PI / 4, -Math.PI / 3],
                            cameraPosition: [4, 7, 6.5],
                            targetPosition: [-4, 6, 0],
                        },
                        onRest: () => {
                            if (!controls) return;
                            controls.enabled = false;
                        },
                    })
                    
                } else if (prev == true) {
                    setSpring.start({
                        from: {
                            envelopePosition: envelope.current.position.toArray(),
                            envelopeRotation: envelope.current.rotation.toArray().slice(0, 3),
                            cameraPosition: camera.position.toArray(),
                            targetPosition: controls.target.toArray(),
                        },
                        to: {
                            envelopePosition: defaultVectors.envelopeDefaultPosition,
                            envelopeRotation: defaultVectors.envelopeDefaultRotation,
                            cameraPosition: [4, 8, 6],
                            targetPosition: [0, 5, 2.3],
                        },
                        onRest: () => {
                            if (!controls) return;
                            controls.enabled = true;
                        }
                    })
                }
                return !prev
            })
        }
    }

    const onLetterClick = (event) => {
        event.stopPropagation();
        if (!animating) {
            setOpenLetter((prev) => {
                if (prev == false) {
                    setSpring.start({
                        from: {
                            letterPosition: letter.current.position.toArray(),
                            cameraPosition: camera.position.toArray(),
                            targetPosition: controls.target.toArray(),
                        },
                        to: [
                            {
                                letterPosition: [-0.5, 0.005, 0],
                            },
                            {
                                letterPosition: [0, 0.5, 0],
                            },
                            {
                                cameraPosition: [3.78676807856841, 7.9, 5.914803239311705],
                                targetPosition: [2.714381852460787, 7.2, 5.349128613705563],
                            }
                        ],
                        onStart: () => {
                            setAnimating(true);
                        },
                        onRest: () => {
                            setAnimating(false);
                        }
                    })
                } else if (prev == true) {
                    setSpring.start({
                        from: {
                            letterPosition: letter.current.position.toArray(),
                        },
                        to: [
                            {
                                letterPosition: [-0.5, 0.005, 0],
                                delay: 1700,
                            },
                            {
                                letterPosition: [-0.15, 0.005, 0],
                            },
                            {
                                cameraPosition: [4, 7, 6.5],
                                targetPosition: [-4, 6, 0],
                            }
                        ],
                        onStart: () => {
                            setAnimating(true);
                        },
                        onRest: () => {
                            setAnimating(false);
                        }
                    })
                }
                return !prev;
            });
        }
    }

    useEffect(() => {
        if (openEnvelope) {
            setSpring.start({
                from: {
                    letterPosition: letter.current.position.toArray()
                },
                to: {
                    letterPosition: [-0.15, 0.005, 0],
                    delay: 500
                }
            })
        } else if (!openEnvelope) {
            setSpring.start({
                from: {
                    letterPosition: letter.current.position.toArray()
                },
                to: {
                    letterPosition: [0, 0.005, 0],
                }
            })
        }

    }, [openEnvelope])

    useFrame (() => {
        if (!mailboxIsHovered.current && !focusMailbox) {
            playground.current.rotation.y += 0.002
        }
    })

    return (
        <>
            <OrbitControls
                enableDamping
                makeDefault
                zoomSpeed={0}
                maxPolarAngle={Math.PI / 1.9}
                panSpeed={panSpeed}
            />
            <AnimateCamera cameraPosition={cameraPosition} target={targetPosition} />
            <AnimateControls target={targetPosition} />
            <animated.group rotation={islandRotation} ref={playground}>
                <pointLight intensity={300} position={[2, 20, 20]} />
                <directionalLight intensity={1} castShadow={true} position={[0, 10, 10]}/>
                <hemisphereLight />
                <Island />
                <animated.mesh
                    position={mailboxSprings.selectionPosition}
                    scale={mailboxSprings.selectionScale}
                    onClick={(event) => onMailboxClick(event, true)}
                    onDoubleClick={(event) => onMailboxClick(event, false)}
                    onPointerOver={(event) => {
                        event.stopPropagation();
                        mailboxIsHovered.current = true;
                        setSpring.start({
                            from: {
                                islandRotation: [
                                    0,
                                    playground.current.rotation.y,
                                    0
                                ]
                            },
                            to: {
                                islandRotation: [
                                    0,
                                    playground.current.rotation.y - (playground.current.rotation.y + startingRotation) % (2 * Math.PI),
                                    0,
                                ]
                            }
                        })
                    }}
                    onPointerLeave={() => {
                        mailboxIsHovered.current = false;
                    }}
                >
                    <sphereGeometry args={[2]}/>
                    <meshStandardMaterial side={2} opacity={0} transparent/>
                </animated.mesh>
                <animated.group
                    scale={mailboxSprings.scale}
                    position={mailboxSprings.position}
                    ref={mailbox}
                >
                    <Mailbox scale={[0.2, 0.2, 0.2]} rotation={[-0.02 * Math.PI , 0, 0.02 * Math.PI]} focusMailbox={focusMailbox} onPointerOver={(event) => event.stopPropagation()}/>
                    <animated.group
                        position={envelopePosition}
                        rotation={envelopeRotation}
                        onPointerOver={(event) => {
                            if (!focusEnvelope) {
                                envelopeIsHovered.current = true;
                                setSpring.start({
                                    from: {
                                        envelopePosition: envelope.current.position.toArray()
                                    },
                                    to: {
                                        envelopePosition: [-0.1, 1.4, 0.5]
                                    }
                                })
                            }
                        }}
                        onPointerLeave={() => {
                            if (!focusEnvelope) {
                                envelopeIsHovered.current = false;
                                setSpring.start({
                                    from: {
                                        envelopePosition: envelope.current.position.toArray(),
                                    },
                                    to: {
                                        envelopePosition: defaultVectors.envelopeDefaultPosition
                                    }
                                })
                            }
                        }}
                        onClick={(event) => onEnvelopeClick(event)}
                        ref={envelope}
                    >
                        <Envelope scale={[0.2, 0.2, 0.2]} focus={focusEnvelope} open={openEnvelope} setOpen={setOpenEnvelope}/>
                        <animated.group
                            position={letterPosition}
                            onClick={(event) => onLetterClick(event)}
                            ref={letter}
                        >
                            <FoldablePaper scale={[0.19, 0.19, 0.19]} rotation={[0, 0, Math.PI]} open={openLetter}/>
                        </animated.group>
                    </animated.group>
                </animated.group>
            </animated.group>
        </>
    )
}