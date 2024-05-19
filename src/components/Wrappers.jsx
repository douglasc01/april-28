import { useThree } from '@react-three/fiber'

export const CameraWrapper = ({ cameraPosition, target }) => {
    const { camera } = useThree();
    camera.position.set(...cameraPosition);
    camera.lookAt(...target);
    return null;
};

export const ControlsWrapper = ({ target }) => {
    const { controls } = useThree();
    if (controls) {
        controls.target.set(...target);
    }
    return null;
}